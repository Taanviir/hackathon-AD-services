from django.db import connection
from django.http import HttpResponse
from django.views import View
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view


# Health check view
class HealthCheck(View):
    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            return HttpResponse("OK", status=200, content_type="text/plain")
        except Exception:
            return HttpResponse("ERROR", status=500, content_type="text/plain")


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
# class SignUpView(APIView, BaseView):
#     authentication_classes = []
#     permission_classes = []
#     template_name = "account/signup.html"
#     title = "Sign Up"
#     css = "css/signup.css"
#     js = "js/signup.js"

#     def get(self, request):
#         return super().get(request)

#     def post(self, request):
#         serializer = PlayerSignupSerializer(data=request.data)
#         if serializer.is_valid():
#             new_player = serializer.save()
#             if new_player:
#                 new_player.last_login = timezone.now()
#                 new_player.save()
#                 refresh = RefreshToken.for_user(new_player)
#                 response = Response(status=status.HTTP_201_CREATED)
#                 response.set_cookie(
#                     "access_token", str(refresh.access_token), httponly=True
#                 )
#                 response.set_cookie("refresh_token", str(refresh), httponly=True)
#                 # create a friend list for the new player
#                 FriendList.objects.create(player=new_player)
#                 return response
#             return Response(
#                 {"error_msg": "Couldn't create the player"},
#                 status=status.HTTP_422_UNPROCESSABLE_ENTITY,
#             )
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get_context_data(self, request):
#         return {"csrf_token": get_token(request)}


# # view for the sign in page
# @method_decorator(csrf_protect, name='dispatch')
# class SignInView(APIView, BaseView):
# 	authentication_classes = []
# 	permission_classes = []
# 	template_name = 'account/signin.html'
# 	title = 'Sign In'
# 	css = 'css/signin.css'
# 	js = 'js/signin.js'

# 	def get(self, request):
# 		next_url = request.GET.get('next', '/')
# 		context = self.get_context_data(request)
# 		context['next'] = next_url
# 		return super().get(request)

# 	def post(self, request):
# 		serializer = PlayerSigninSerializer(data=request.data)
# 		if serializer.is_valid():
# 			username = serializer.validated_data['username']
# 			password = serializer.validated_data['password']
# 			player = authenticate(username=username, password=password)
# 			if player is not None:
# 				refresh = RefreshToken.for_user(player)
# 				response = Response(status=status.HTTP_200_OK)
# 				response.set_cookie('access_token', str(refresh.access_token), httponly=True)
# 				response.set_cookie('refresh_token', str(refresh), httponly=True)
# 				if player.tfa:
# 					if send_2fa_code(player):
# 						response.status_code = 302  # or 301 for a permanent redirect
# 					else:
# 						return Response({'error_msg': 'Couldn\'t send OTP to the given Email'},
#                                     status=status.HTTP_422_UNPROCESSABLE_ENTITY)
# 				player.last_login = timezone.now() # IF EVERYTHING IS OK, UPDATE LAST LOGIN
# 				player.save()
# 				return response
# 			return Response({'error_msg': 'Invalid username or password!'},
#                         status=status.HTTP_401_UNAUTHORIZED)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 	def get_context_data(self, request):
# 		return {'csrf_token': get_token(request)}

# class SignOutView(BaseView, View):
# 	def get(self, request):
# 		token_string = request.COOKIES.get('access_token')
# 		if token_string:
# 			try:
# 				add_token_to_blacklist(token_string)
# 			except jwt.ExpiredSignatureError or jwt.InvalidTokenError or jwt.DecodeError as e:
# 				print('Token has: ', e)
# 			response = HttpResponseRedirect(reverse('landing'))
# 			response.delete_cookie('access_token')
# 			response.delete_cookie('refresh_token')
# 			response.delete_cookie('csrftoken')
# 			response.singed_out = True
# 			return response
# 		return HttpResponseRedirect(reverse('landing'))
