from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import RestaurantOwnerProfile, CustomerProfile

User = get_user_model()


class CustomerRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["email", "fullname", "password", "gender", "phone_number"]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            fullname=validated_data["fullname"],
            gender=validated_data.get("gender"),
            phone_number=validated_data["phone_number"],
            user_type="customer",
        )

        CustomerProfile.objects.create(user=user)

        return user


class OwnerRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    restaurant_name = serializers.CharField(write_only=True)
    description = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            "email",
            "fullname",
            "password",
            "gender",
            "phone_number",
            "restaurant_name",
            "description",
            "address",
        ]

    def create(self, validated_data):
        restaurant_name = validated_data.pop("restaurant_name")
        description = validated_data.pop("description")
        address = validated_data.pop("address", "")

        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            fullname=validated_data["fullname"],
            gender=validated_data.get("gender"),
            phone_number=validated_data["phone_number"],
            user_type="owner",
        )

        RestaurantOwnerProfile.objects.create(
            user=user,
            restaurant_name=restaurant_name,
            description=description,
            address=address,
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Email and password are required.")

        return attrs


class CustomerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "fullname", "gender", "phone_number", "user_type"]
        read_only_fields = ["id", "user_type"]


class RestaurantOwnerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantOwnerProfile
        fields = ["restaurant_name", "description", "address"]


class OwnerUserSerializer(serializers.ModelSerializer):
    owner_profile = RestaurantOwnerProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "fullname",
            "gender",
            "phone_number",
            "user_type",
            "owner_profile",
        ]
