from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from phonenumber_field import modelfields


class UserManager(BaseUserManager):
    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("user_type", "admin")

        if not extra_fields.get("is_superuser"):
            raise ValueError("Superuser must have is_superuser=True.")
        if not extra_fields.get("is_staff"):
            raise ValueError("Superuser must have is_staff=True.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    GENDER_CHOICES = (
        ("M", "Male"),
        ("F", "Female"),
        ("O", "Other"),
    )

    username = None
    email = models.EmailField(unique=True)
    fullname = models.CharField(max_length=100)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, null=True, blank=True
    )
    phone_number = modelfields.PhoneNumberField(unique=True)

    USER_TYPE_CHOICES = (
        ("customer", "Customer"),
        ("owner", "Restaurant Owner"),
        ("admin", "Administrator"),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

    REQUIRED_FIELDS = ["fullname", "user_type", "phone_number"]
    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return f"{self.email} ({self.user_type})"


class RestaurantOwnerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="owner_profile"
    )
    verified = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.fullname} ({self.user.email})"



class CustomerProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="customer_profile"
    )
