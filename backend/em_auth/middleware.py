import redis
import jwt
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from django.conf import settings


# strict redis instance - comes with redis client
redis_instance = redis.StrictRedis(
    host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB
)


# just checks if token is in blacklist
# EX: `GET mykey`
def is_token_blacklisted(token_string):
    try:
        token = jwt.decode(
            token_string,
            algorithms=["HS256"],
            key=settings.SECRET_KEY,
            options={"verify_exp": True},
        )
        jti = token["jti"]
        return redis_instance.exists(jti) > 0  # Check if the key exists in Redis
    except jwt.ExpiredSignatureError:
        print("Token has expired", flush=True)
        return True  # Treat expired tokens as blacklisted
    except jwt.InvalidTokenError as e:
        print("Invalid token: ", e, flush=True)
        return True  # Treat invalid tokens as blacklisted
    except Exception as e:
        print("Error decoding token: ", e, flush=True)
        return True  # Treat unexpected errors as blacklisted


# extracts JTI (JSON Token Identifier) from token and adds it to blacklist using SETEX command - sets key with expiry time (auto deletes)
# EX: `SETEX mykey 3600 "hello"`
def add_token_to_blacklist(token_string):
    try:
        token = jwt.decode(
            token_string,
            algorithms=["HS256"],
            key=settings.SECRET_KEY,
            options={"verify_exp": True},
        )
        expires_in = token["exp"] - token["iat"]
        jti = token["jti"]
        redis_instance.setex(jti, expires_in, "blacklisted")
    except jwt.ExpiredSignatureError:
        print("Token has expired", flush=True)
        return True
    except jwt.InvalidTokenError:
        print("Invalid token", flush=True)
        return True
    except Exception:
        print("Error decoding token", flush=True)
        return True


# custom JWT authentication class that uses cookies instead of Authorization header
class JWTCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get("access_token")
        if raw_token is None:
            print("No token found in cookies", flush=True)
            raise AuthenticationFailed("No token found in cookies")
        try:
            if is_token_blacklisted(raw_token):
                print("Token is blacklisted", flush=True)
                raise AuthenticationFailed("This token is blacklisted")
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            print("user", user, flush=True)
            return (user, validated_token)
        except InvalidToken as e:
            print("invalid token", flush=True)
            raise AuthenticationFailed(str(e))
        except AuthenticationFailed as e:
            print("auth fail: ", str(e), flush=True)
            raise AuthenticationFailed(str(e))
        except Exception as e:
            print("An unexpected error occurred", flush=True)
            raise AuthenticationFailed(f"An unexpected error occurred: {e}")
