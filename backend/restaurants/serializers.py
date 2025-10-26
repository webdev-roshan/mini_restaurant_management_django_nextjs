from rest_framework import serializers
from .models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ["owner", "name", "description", "address"]
