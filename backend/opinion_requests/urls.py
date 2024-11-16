Request Title
from django.urls import path, re_path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"opinion_request", OpinionRequestViewSet, basename="opinion_request")

urlpatterns = [
    path(
        "process_document/", DocumentProcessingView.as_view(), name="process_document"
    ),
]
urlpatterns += router.urls
