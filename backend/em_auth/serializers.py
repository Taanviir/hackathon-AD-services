from rest_framework import serializers
from .models import Employee
from django.contrib.auth import authenticate


from rest_framework import serializers
from .models import Employee  # Adjust the import based on your project structure


class EmployeeSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "full_name",
            "email",
            "department",
            "position",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user_password = validated_data.pop("password")
        new_employee = self.Meta.model(**validated_data)
        new_employee.set_password(user_password)
        new_employee.save()
        return new_employee

    def validate_email(self, email):
        if self.Meta.model.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return email


# Employee login serializer
class EmployeeLoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        try:
            emp = Employee.objects.get(email=email)
            if emp.check_password(password):  # Assuming `check_password` is available
                data['user'] = emp
                return data
        except Employee.DoesNotExist:
            return None
