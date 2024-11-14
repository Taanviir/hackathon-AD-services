from django.db import connection
from django.http import HttpResponse
from django.views import View
from django.utils import timezone

# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import csrf_protect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from django.contrib.auth import authenticate
from .auth_middleware import *
from django.http import HttpResponseRedirect
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse


# Health check view
class HealthCheck(View):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            return HttpResponse("OK", status=200, content_type="text/plain")
        except Exception:
            return HttpResponse("ERROR", status=500, content_type="text/plain")


""" 
By default, DRF uses the:
    - SessionAuthentication and,
    - BasicAuthentication classes if you do not specify any.
    - if you want to allow all, you can set the authentication_classes to an empty list
 """


# landing view
class LandingView(View):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return HttpResponse("Welcome to the landing page")


# Home view
class HomeView(View):
    def get(self, request):
        return HttpResponse("Welcome to the home page")


# # view for the sign up page
# @method_decorator(csrf_protect, name="dispatch")
class SignupView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return HttpResponse("Welcome to the sign up page")
    
    def post(self, request):
        print("we in the signup view", flush=True)
        serializer = EmployeeSignupSerializer(data=request.data)
        if serializer.is_valid():
            new_employee = serializer.save()
            if new_employee:
                new_employee.last_login = timezone.now()
                new_employee.save()
                refresh = RefreshToken.for_user(new_employee)
                response = Response(status=status.HTTP_201_CREATED)
                response.set_cookie(
                    "access_token",
                    str(refresh.access_token),
                    samesite="Strict",
                    httponly=True,
                )
                response.set_cookie(
                    "refresh_token", str(refresh), samesite="Strict", httponly=True
                )
                print(
                    f"access tokens: {str(refresh.access_token)}, =>  Refresh: {str(refresh)}",
                    flush=True,
                )
                return response
            return Response(
                {"error_message": "Couldn't register the empolyee"},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # view for the login in page
class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return HttpResponse("Welcome to the login page")
    
    def post(self, request):
        print("Cookies: ", request.COOKIES, flush=True)
        serializer = EmployeeLoginSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.validated_data["user"]
            if employee:
                refresh = RefreshToken.for_user(employee)
                response = Response(status=status.HTTP_200_OK)
                response.set_cookie(
                    "access_token",
                    str(refresh.access_token),
                    samesite="Strict",
                    httponly=True,
                )
                response.set_cookie(
                    "refresh_token", str(refresh), samesite="Strict", httponly=True
                )
                employee.last_login = timezone.now()
                employee.save()
                return response
            return Response(
                {"error_msg": "Invalid username or password!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignOutView(View):
    authenctication_classes = [JWTCookieAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        token_string = request.COOKIES.get("access_token")
        if token_string:
            try:
                add_token_to_blacklist(token_string)
            except (
                jwt.ExpiredSignatureError or jwt.InvalidTokenError or jwt.DecodeError
            ) as e:
                print("Token has: ", e)
            response = HttpResponseRedirect(reverse("landing_page"))
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            # response.delete_cookie('csrftoken')
            response.singed_out = True
            return response
        return HttpResponseRedirect(reverse("landing_page"))


""" TODO: 

    -> JWT token pairs are disappearing after a refresh - need to fix this
        * if you set the samesite to None, you need to set the secure to True
        # and for this we will need to route the traffic through a reverse proxy - nginx using https

"""
