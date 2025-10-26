from rest_framework import generics
from .serializers import CategorySerializer, ItemsSerializer
from authentication.permissions import IsOwner
from .models import Category, Items
from django.shortcuts import get_object_or_404


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


class ItemsListCreateView(generics.ListCreateAPIView):
    serializer_class = ItemsSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Items.objects.filter(
            category__restaurant__owner=self.request.user
        ).order_by("category", "name")

    def perform_create(self, serializer):
        category = serializer.validated_data.get("category")
        if category.restaurant.owner != self.request.user:
            raise PermissionError("You cannot add items to another owner's category.")
        serializer.save()


class ItemsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ItemsSerializer
    permission_classes = [IsOwner]

    def get_object(self):
        pk = self.kwargs.get("pk")
        queryset = Items.objects.filter(category__restaurant__owner=self.request.user)
        return get_object_or_404(queryset, pk=pk)
