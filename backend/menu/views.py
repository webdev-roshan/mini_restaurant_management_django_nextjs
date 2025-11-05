from rest_framework import generics, permissions
from .serializers import CategorySerializer, ItemsSerializer
from authentication.permissions import IsOwner
from .models import Category, Items
from django.shortcuts import get_object_or_404
from restaurants.models import Restaurant


class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Category.objects.filter(restaurant__owner=self.request.user)

    def perform_create(self, serializer):
        restaurant = self.request.user.restaurants.first()
        serializer.save(restaurant=restaurant)


class CategoryRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsOwner]

    def get_object(self):
        pk = self.kwargs.get("pk")
        queryset = Category.objects.filter(restaurant__owner=self.request.user)
        return get_object_or_404(queryset, pk=pk)


class CategoryItemListView(generics.ListAPIView):
    serializer_class = ItemsSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        category_id = self.kwargs.get("pk")
        return Items.objects.filter(
            category__id=category_id, category__restaurant__owner=self.request.user
        )


class ItemsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemsSerializer
    permission_classes = [IsOwner]

    def get_object(self):
        pk = self.kwargs.get("pk")
        queryset = Items.objects.filter(category__restaurant__owner=self.request.user)
        return get_object_or_404(queryset, pk=pk)


class RestaurantCategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        restaurant_id = self.kwargs.get("pk")
        restaurant = get_object_or_404(Restaurant, pk=restaurant_id)
        return Category.objects.filter(restaurant=restaurant)


class ItemsListCreateView(generics.ListCreateAPIView):
    serializer_class = ItemsSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Items.objects.filter(category__restaurant__owner=self.request.user)

    def perform_create(self, serializer):
        category_id = self.request.data.get("category")
        category = get_object_or_404(
            Category, id=category_id, restaurant__owner=self.request.user
        )
        serializer.save(category=category)
