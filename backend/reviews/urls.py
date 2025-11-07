from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestaurantReviewViewSet, ItemReviewViewSet

restaurant_router = DefaultRouter()
restaurant_router.register(
    r"restaurants/(?P<restaurant_id>\d+)/reviews",
    RestaurantReviewViewSet,
    basename="restaurant-reviews",
)

item_router = DefaultRouter()
item_router.register(
    r"items/(?P<item_id>\d+)/reviews",
    ItemReviewViewSet,
    basename="item-reviews",
)

urlpatterns = [
    path("", include(restaurant_router.urls)),
    path("", include(item_router.urls)),
]
