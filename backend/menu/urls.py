from django.urls import path
from .views import (
    CategoryListCreateView,
    CategoryRetrieveUpdateDeleteView,
    CategoryItemListView,
    ItemsRetrieveUpdateDestroyView,
    RestaurantCategoryListView,
    ItemsListCreateView,
)

urlpatterns = [
    path("categories/", CategoryListCreateView.as_view(), name="category-list-create"),
    path(
        "categories/<int:pk>/",
        CategoryRetrieveUpdateDeleteView.as_view(),
        name="category-detail",
    ),
    path(
        "category/<int:pk>/items/",
        CategoryItemListView.as_view(),
        name="category-items",
    ),
    path("items/", ItemsListCreateView.as_view(), name="item-list-create"),
    path(
        "items/<int:pk>/", ItemsRetrieveUpdateDestroyView.as_view(), name="item-detail"
    ),
    path(
        "restaurant/<int:pk>/categories/",
        RestaurantCategoryListView.as_view(),
        name="restaurant-categories",
    ),
]
