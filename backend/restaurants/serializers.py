from rest_framework import serializers
from .models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ["id", "owner", "name", "description", "address", "image"]
        read_only_fields = ["id", "owner"]
