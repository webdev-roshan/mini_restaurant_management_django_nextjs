from rest_framework import serializers
from .models import Category, Items


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_name(self, value):
        if len(value.strip()) <= 2:
            raise serializers.ValidationError(
                "Name must be at least 3 characters long."
            )
        return value

    def validate(self, attrs):
        price = attrs.get("price")
        if price <= 0:
            raise serializers.ValidationError(
                {"price": "Price must be greater than zero."}
            )
        return attrs


class CategorySerializer(serializers.ModelSerializer):
    restaurant_name = serializers.ReadOnlyField(source="restaurant.name")
    menu_items = ItemsSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]
