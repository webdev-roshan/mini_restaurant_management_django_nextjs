from django.db import models
from restaurants.models import Restaurant


class Category(models.Model):

    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name="category_name"
    )
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("restaurant", "name")


class Items(models.Model):
    CURRENCY_CHOICES = [
        ("USD", "USD"),
        ("EUR", "EUR"),
        ("INR", "INR"),
        ("NPR", "NPR"),
    ]

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="menu_items"
    )
    name = models.CharField(max_length=50)
    description = models.TextField()
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default="USD")
    price = models.DecimalField(max_digits=8, decimal_places=2)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to="menu_items/", null=True, blank=True)
    is_vegetarian = models.BooleanField(default=False)
    is_spicy = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("category", "name")
