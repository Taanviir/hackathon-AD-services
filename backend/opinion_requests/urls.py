from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"opinion_request", OpinionRequestViewSet, basename="opinion_request")

urlpatterns = router.urls
