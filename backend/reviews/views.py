from rest_framework import viewsets, permissions
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.response import Response


class RestaurantReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        restaurant_id = self.kwargs.get("restaurant_id")
        return Review.objects.filter(
            review_type="restaurant", restaurant_id=restaurant_id
        )

    def perform_create(self, serializer):
        restaurant_id = self.kwargs.get("restaurant_id")
        serializer.save(
            user=self.request.user,
            review_type="restaurant",
            restaurant_id=restaurant_id,
        )


class ItemReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        item_id = self.kwargs.get("item_id")
        return Review.objects.filter(review_type="item", item_id=item_id)

    def perform_create(self, serializer):
        item_id = self.kwargs.get("item_id")
        serializer.save(user=self.request.user, review_type="item", item_id=item_id)
