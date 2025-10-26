from django.urls import path
from .views import (
    CustomerRegisterView,
    OwnerRegisterView,
    LoginView,
    LogoutView,
    RefreshTokenView,
    UserProfileView,
)

urlpatterns = [
    path(
        "register/customer/", CustomerRegisterView.as_view(), name="customer-register"
    ),
    path("register/owner/", OwnerRegisterView.as_view(), name="owner-register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("refresh/", RefreshTokenView.as_view(), name="token-refresh"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
]
