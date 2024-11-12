from django.urls import path
from .views import DocumentProcessingView

urlpatterns = [
    path(
        "process_document/", DocumentProcessingView.as_view(), name="process_document"
    ),
]
