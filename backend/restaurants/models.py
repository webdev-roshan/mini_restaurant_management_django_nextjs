from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Restaurant(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="restaurants"
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    address = models.TextField(blank=True, null=True)
