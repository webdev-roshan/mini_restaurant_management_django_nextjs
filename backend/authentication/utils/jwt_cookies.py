from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


def set_jwt_cookies(response: Response, user) -> Response:

    refresh = RefreshToken.for_user(user)

    response.set_cookie(
        key="access_token",
        value=str(refresh.access_token),
        httponly=True,
        samesite="Lax",
        max_age=60 * 15,
        secure=False,
    )

    response.set_cookie(
        key="refresh_token",
        value=str(refresh),
        httponly=True,
        samesite="Lax",
        max_age=60 * 60 * 24,
        secure=False,
    )

    return response


def set_access_cookie(response: Response, access_token: str) -> Response:

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="Lax",
        max_age=60 * 15,
        secure=False,
    )
    return response


def clear_jwt_cookies(response: Response) -> Response:

    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response
