from django.contrib import admin
from .models import User, RestaurantOwnerProfile, CustomerProfile

admin.site.register(User)
admin.site.register(RestaurantOwnerProfile)
admin.site.register(CustomerProfile)
