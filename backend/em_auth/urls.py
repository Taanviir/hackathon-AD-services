from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.LandingView.as_view(), name="landing_page"),
    re_path(r"^home/?$", views.HomeView.as_view(), name="home_page"),
    re_path(r"^signup/?$", views.SignupView.as_view(), name="signup_page"),
    re_path(r"^login/?$", views.LoginView.as_view(), name="login_page"),
    re_path(r"^signout/?$", views.SignOutView.as_view(), name="signout_page"),
]
