from django.db import models
from authentication.models import User
from menu.models import Items
from restaurants.models import Restaurant


class Review(models.Model):
    REVIEW_TYPE_CHOICES = [
        ("restaurant", "Restaurant"),
        ("item", "Item"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_type = models.CharField(max_length=20, choices=REVIEW_TYPE_CHOICES)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="reviews",
    )
    item = models.ForeignKey(
        Items,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="reviews",
    )
    rating = models.PositiveSmallIntegerField(default=0)
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        if self.review_type == "restaurant" and self.restaurant:
            return f"{self.user} - {self.restaurant.name} ({self.rating}/5)"
        elif self.review_type == "item" and self.item:
            return f"{self.user} - {self.item.name} ({self.rating}/5)"
        return f"{self.user} - Review ({self.rating}/5)"

    def clean(self):
        from django.core.exceptions import ValidationError

        if self.review_type == "restaurant" and not self.restaurant:
            raise ValidationError("Restaurant review must have a restaurant assigned.")
        if self.review_type == "item" and not self.item:
            raise ValidationError("Item review must have an item assigned.")
        if self.restaurant and self.item:
            raise ValidationError(
                "A review cannot be linked to both a restaurant and an item."
            )

    @property
    def target_name(self):
        if self.review_type == "restaurant" and self.restaurant:
            return self.restaurant.name
        elif self.review_type == "item" and self.item:
            return self.item.name
        return "Unknown"
