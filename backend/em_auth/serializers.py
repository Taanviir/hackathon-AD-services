from rest_framework import serializers
from .models import Employee
from django.contrib.auth import authenticate


class EmployeeSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "username",
            "email",
            "full_name",
            "department",
            "position",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # if (validated_data['password'] != self.initial_data['confirm_password']):
        #     raise serializers.ValidationError("Passwords do not match from backend.")
        user_password = validated_data.pop("password")
        new_employee = self.Meta.model(**validated_data)
        new_employee.set_password(user_password)
        new_employee.save()
        return new_employee

    # validate username - we can add email uniqueness check here as well - if think is neccessary
    def validate_username(self, username):
        if self.Meta.model.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                "A user with this username already exists."
            )
        return username


# Employee login serializer
class EmployeeLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            # Authenticate the user
            user = authenticate(username=username, password=password)
            if user is None:
                raise serializers.ValidationError("Invalid username or password.")
            data["user"] = user  # Store the authenticated user in the validated data
        else:
            raise serializers.ValidationError(
                "Both username and password are required."
            )

        return data
