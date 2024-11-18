from django.urls import path, re_path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"opinion_request", OpinionRequestViewSet, basename="opinion_request")

urlpatterns = router.urls

urlpatterns += [
    re_path(r"^dashboard_info/?$", DashBoardInfo.as_view(), name="dashboard_info"),
]
