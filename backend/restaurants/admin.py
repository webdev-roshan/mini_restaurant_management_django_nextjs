from django.contrib import admin
from .models import Restaurant


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("name", "owner", "address")
    list_filter = ("owner",)
    search_fields = ("name", "owner__email", "owner__fullname")
    ordering = ("name",)
