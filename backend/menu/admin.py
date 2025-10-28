from django.contrib import admin
from .models import Category, Items


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "restaurant", "description", "created_at")
    list_filter = ("restaurant", "created_at")
    search_fields = ("name", "restaurant__name", "description")
    ordering = ("restaurant", "name")
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        ("Category Info", {
            "fields": ("restaurant", "name", "description")
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )


@admin.register(Items)
class ItemsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "price",
        "currency",
        "available",
        "is_vegetarian",
        "is_spicy",
        "created_at",
    )
    list_filter = (
        "available",
        "is_vegetarian",
        "is_spicy",
        "currency",
        "category__restaurant",
    )
    search_fields = ("name", "description", "category__name", "category__restaurant__name")
    ordering = ("category", "name")
    readonly_fields = ("created_at", "updated_at")
    list_editable = ("available", "price")

    fieldsets = (
        ("Item Info", {
            "fields": (
                "category",
                "name",
                "description",
                "image",
                "currency",
                "price",
                "available",
                "is_vegetarian",
                "is_spicy",
            )
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",)
        }),
    )
