from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, RestaurantOwnerProfile, CustomerProfile

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ("email", "fullname", "user_type", "is_staff", "is_superuser")
    list_filter = ("user_type", "is_staff", "is_superuser")
    search_fields = ("email", "fullname", "phone_number")
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("fullname", "gender", "phone_number")}),
        ("Permissions", {"fields": ("user_type", "is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "fullname", "password1", "password2", "user_type", "phone_number"),
        }),
    )

admin.site.register(User, UserAdmin)

@admin.register(RestaurantOwnerProfile)
class RestaurantOwnerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "verified")
    list_filter = ("verified",)
    search_fields = ("user__email", "user__fullname")

@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ("user",)
    search_fields = ("user__email", "user__fullname")
