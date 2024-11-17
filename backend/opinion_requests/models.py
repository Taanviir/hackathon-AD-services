from django.db import models
from em_auth.models import Employee

"""  NOTE: Request will have
    * From (Requestor) - Employee and Department (baically the department of the requestor)
    * To (Department) - Department
    * Title
    * Description - request body
    * Deadline
    * priority
    * status - submitted, pending, fullfilled
   ###### after submission and viewed by the department head ######
    * assigned to - the employee who will be responsible for the request
"""


class OpinionRequest(models.Model):
    id = models.BigAutoField(primary_key=True)
    requester = models.ForeignKey(
        Employee, on_delete=models.CASCADE
    )  # the one who submitted the request
    target_department = models.CharField(
        max_length=150, blank=True, null=True, default="NOT ASSIGNED"
    )  # the department the request is going to
    title = models.CharField(max_length=150, blank=False)
    description = models.TextField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deadline = models.DateTimeField()
    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default="medium"
    )
    STATUS_CHOICES = [
        ("submitted", "Submitted"),
        ("pending", "Pending"),
        ("fullfilled", "Fullfilled"),
    ]
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="submitted"
    )
    assigned_to = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="assigned_to", null=True
    )
    resources = models.FileField(upload_to="resources/", null=True, blank=True)

    class Meta:
        db_table = "opinion_requests"

    def __str__(self):
        return f"{self.request_title} - {self.requester} ({self.status})"
