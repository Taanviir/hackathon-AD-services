from django.db import models
from django.contrib.auth.models import AbstractUser


# Custom User Model
class Employee(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    full_name = models.CharField(max_length=150, blank=True)
    department = models.CharField(max_length=150, blank=False)
    position = models.CharField(max_length=150, blank=False)
    email = models.EmailField()
    password = models.CharField(max_length=150)

    class Meta:
        db_table = "employee"
        unique_together = ["username", "email"]

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "full_name", "department", "position"]

    def __str__(self):
        return self.username
