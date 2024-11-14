from django.urls import path, re_path
from .views import *

urlpatterns = [
    path(
        "process_document/", DocumentProcessingView.as_view(), name="process_document"
    ),
    re_path(
        r"opinion_request/$",
        OpinionRequestView.as_view(),
        name="opinion_request",
    ),
]
