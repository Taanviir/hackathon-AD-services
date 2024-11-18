from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser, BaseUserManager


class EmployeeManager(BaseUserManager):
    def create_user(self, email, full_name, department, position, password=None):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(
            email=email, full_name=full_name, department=department, position=position
        )
        user.set_password(password)  # Use set_password to hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, department, position, password=None):
        user = self.create_user(email, full_name, department, position, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Employee(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    full_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(unique=True, blank=False)
    department = models.CharField(max_length=150, blank=False)
    position = models.CharField(max_length=150, blank=False)

    username = None  # Remove username field
    first_name = None  # Remove first_name field
    last_name = None  # Remove last_name field
    is_superuser = None
    is_staff = None

    objects = EmployeeManager()  # Set the custom manager

    class Meta:
        db_table = "employee"

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name", "department", "position"]

    def __str__(self):
        return self.full_name
