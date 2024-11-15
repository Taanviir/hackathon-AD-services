from django.urls import path
from .views import ResearchView

urlpatterns = [
    path("research/", ResearchView.as_view(), name="research"),
]
