from rest_framework import permissions


class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.user_type == "owner"
        )


class IsCustomer(permissions.BasePermission):

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.user_type == "customer"
        )
