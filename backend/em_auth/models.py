from django.db import models
from django.contrib.auth.models import AbstractUser


# Custom User Model
class Employee(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    full_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=150, blank=False)
    position = models.CharField(max_length=150, blank=False)
    password = models.CharField(max_length=150)

    username = None  # Remove username field
    first_name = None  # Remove first_name field
    last_name = None  # Remove last_name field
    last_login = None
    is_superuser = None
    is_staff = None
    is_active = None
    date_joined = None

    class Meta:
        db_table = "employee"

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "department", "position"]

    def __str__(self):
        return self.full_name
