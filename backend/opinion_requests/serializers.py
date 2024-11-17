from rest_framework import serializers
from .models import OpinionRequest
from django.utils import timezone


class OpinionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpinionRequest
        fields = [
            "id",
            "target_department",
            "title",
            "description",
            "created_at",
            "updated_at",
            "deadline",
            "priority",
            "status",
            "assigned_to",
            "resources",
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
