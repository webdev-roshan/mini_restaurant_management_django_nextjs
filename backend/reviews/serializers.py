from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    target_name = serializers.ReadOnlyField()

    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "rating",
            "review",
            "created_at",
            "updated_at",
            "target_name",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "user", "target_name"]

    def validate(self, data):
        review_type = data.get("review_type")
        restaurant = data.get("restaurant")
        item = data.get("item")

        if review_type == "restaurant" and not restaurant:
            raise serializers.ValidationError(
                "Restaurant review must have a restaurant assigned."
            )
        if review_type == "item" and not item:
            raise serializers.ValidationError("Item review must have an item assigned.")
        if restaurant and item:
            raise serializers.ValidationError(
                "A review cannot be linked to both a restaurant and an item."
            )

        return data

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)
