import jwt
from django.http import HttpResponse
from django.views import View
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import EmployeeSignupSerializer, EmployeeLoginSerializer
from .middleware import JWTCookieAuthentication, add_token_to_blacklist
from django.http import HttpResponse


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
                )
                response.set_cookie("refresh_token", str(refresh), samesite="Strict")
                is_manager = new_employee.position == "manager"
                response.set_cookie("isManager", is_manager, samesite="Strict")
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
                )
                response.set_cookie("refresh_token", str(refresh), samesite="Strict")
                is_manager = employee.position == "manager"
                response.set_cookie("isManager", is_manager, samesite="Strict")
                employee.last_login = timezone.now()
                employee.save()
                return response
            return Response(
                {"error_msg": "Invalid username or password!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogOutView(View):
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
            response = HttpResponse()
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            response.delete_cookie("isManager")
            response.delete_cookie("isLogged")
            return response
        return HttpResponse()


"""
    TODO:

    -> JWT token pairs are disappearing after a refresh - need to fix this
        * if you set the samesite to None, you need to set the secure to True
        # and for this we will need to route the traffic through a reverse
          proxy - nginx using https
"""
