from rest_framework import generics
from .serializers import RestaurantSerializer
from .models import Restaurant
from authentication.permissions import IsOwner
from django.shortcuts import get_object_or_404


class RestaurantListView(generics.ListAPIView):

    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class OwnerRestaurantListCreateView(generics.ListCreateAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return Restaurant.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class OwnerRestaurantRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [IsOwner]

    def get_object(self):
        pk = self.kwargs.get("pk")
        queryset = Restaurant.objects.filter(owner=self.request.user)
        return get_object_or_404(queryset, pk=pk)
