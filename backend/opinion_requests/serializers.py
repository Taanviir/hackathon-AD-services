from rest_framework import serializers
from .models import *
from django.utils import timezone


class OpinionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpinionRequest
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "updated_at",
            "deadline",
            "priority",
            "status",
            "resources",
            "target_departments",
        ]
        extra_kwargs = {
            "title": {"required": True},
            "description": {"required": True},
            "priority": {"required": True},
            "deadline": {"required": True},
        }

    def validate_deadline(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("The deadline must be a future date.")
        return value


class IORTargetDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IORTargetDepartment
        fields = [
            "id",
            "request",
            "department_name",
            "questions",
            "feedback",
        ]

    def validate_questions(self, value):
        if value and not isinstance(value, list):
            raise serializers.ValidationError("Questions must be a list of strings.")
        return value
