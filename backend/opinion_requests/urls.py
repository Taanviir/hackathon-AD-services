from django.urls import path
from .views import OpinionRequestsView

urlpatterns = [
    path("process_document/", OpinionRequestsView.as_view(), name="process_document"),
]
