from django.urls import path
from .views import (
    RestaurantListView,
    OwnerRestaurantListCreateView,
    OwnerRestaurantRetrieveUpdateDestroyView,
)

urlpatterns = [
    path("all/", RestaurantListView.as_view(), name="restaurant-list"),
    path(
        "owner/",
        OwnerRestaurantListCreateView.as_view(),
        name="owner-restaurant-list-create",
    ),
    path(
        "owner/<int:pk>/",
        OwnerRestaurantRetrieveUpdateDestroyView.as_view(),
        name="owner-restaurant-detail",
    ),
]
