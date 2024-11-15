from django.urls import path, re_path
from em_auth.views import *

urlpatterns = [
    path("", LandingView.as_view(), name="landing_page"),
    re_path(r"^home/?$", HomeView.as_view(), name="home_page"),
    re_path(r"^signup/?$", SignupView.as_view(), name="signup_page"),
    re_path(r"^login/?$", LoginView.as_view(), name="login_page"),
    re_path(r"^signout/?$", SignOutView.as_view(), name="signout_page"),
    re_path(r"^health/?$", HealthCheck.as_view(), name="health_check"),
]
