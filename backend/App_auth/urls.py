from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from App_auth.views import *
from App_auth.alternativeRegistrationWithEmailSending import registerView as emailRegisterView
from App_auth.alternativeRegistrationWithEmailSending import verify as verifyEmail

app_name = 'App_auth'

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name="registration"),
    path('register-2/', registerAPIView, name="registration"),
    path('login/token/', UserLoginView.as_view()),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('profile-view/', UserProfileModelAPIView.as_view()),
    path('profile-update-view/', profile_update_api_view),
    # path('login/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register-api-with-email/", emailRegisterView),
    path("verify-email/", verifyEmail),
]
