from rest_framework import permissions, status
from rest_framework.response import Response
from .serializers import (
    CustomerRegisterSerializer,
    OwnerRegisterSerializer,
    CustomerUserSerializer,
    OwnerUserSerializer,
    LoginSerializer,
)
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from .utils.jwt_cookies import set_jwt_cookies, set_access_cookie, clear_jwt_cookies


class CustomerRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CustomerRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response = Response(
                {
                    "user": CustomerUserSerializer(user).data,
                    "message": "Customer registered successfully",
                },
                status=status.HTTP_201_CREATED,
            )
            return set_jwt_cookies(response, user)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OwnerRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OwnerRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response = Response(
                {
                    "user": OwnerUserSerializer(user).data,
                    "message": "Restaurant owner registered successfully",
                },
                status=status.HTTP_201_CREATED,
            )
            return set_jwt_cookies(response, user)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]
        user = authenticate(email=email, password=password)

        if not user:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        if user.user_type == "owner":
            user_data = OwnerUserSerializer(user).data
        else:
            user_data = CustomerUserSerializer(user).data

        response = Response(
            {
                "user": user_data,
                "message": "Login successful",
            },
            status=status.HTTP_200_OK,
        )

        return set_jwt_cookies(response, user)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        return clear_jwt_cookies(response)


class RefreshTokenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"error": "Refresh token not found"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            response = Response(
                {"message": "Token refreshed successfully"}, status=status.HTTP_200_OK
            )
            return set_access_cookie(response, access_token)
        except Exception:
            return Response(
                {"error": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED
            )


class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        user = self.request.user
        if user.user_type == "owner":

            return OwnerUserSerializer
        return CustomerUserSerializer

    def get_object(self):
        return self.request.user
