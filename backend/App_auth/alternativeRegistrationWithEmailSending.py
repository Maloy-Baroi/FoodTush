import json
import uuid

from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.core.mail import send_mail
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.urls import reverse
from django.contrib.auth.models import Group

# Models
from App_auth.models import CustomUser, ProfileModel

# Rest API
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


@api_view(['POST'])
def registerView(request):
    if request.method == 'POST':
        auth_token = str(uuid.uuid4())
        groups = str(request.data['groups']).upper()
        email = request.data['email']
        sent_password = auth_token
        if CustomUser.objects.filter(email=email).exists():
            return Response({"error": "This email is already registered!!!"})
        user = CustomUser(email=email)
        user.set_password(sent_password)
        user.save()
        grp = Group.objects.get_or_create(name=groups)
        grp[0].user_set.add(user)
        profile_obj = ProfileModel.objects.create(user=user, auth_token=auth_token, is_verified=False)
        profile_obj.save()
        send_mail_after_registration(email, auth_token, groups)
        return Response({"success": f"Sent a mail to {email}. Please Check and verify the account", "auth": f"{auth_token}"})


@api_view(['POST'])
def verify(request):
    if request.method == 'POST':
        password = request.data['password']
        auth_token = request.data['auth_token']
        try:
            profile_obj = ProfileModel.objects.filter(auth_token=auth_token).first()
            if profile_obj:
                if profile_obj.is_verified:
                    return Response({"verified": "Your account is already verified."})
                profile_obj.is_verified = True
                profile_obj.user.set_password(password)
                profile_obj.user.save()
                profile_obj.save()
                return Response({'success': "We have verified your account."})
            else:
                return Response({'error': "Sorry. Something went wrong!"})
        except Exception as e:
            print(e)
            return Response({'error': f"Sorry. It's completely wrong! {e}"})


def error_page(request):
    return JsonResponse("Error")


def send_mail_after_registration(email, token, group):
    subject = 'FoodTush Account Verification!!!'
    if group.lower() == 'restaurant':
        message = f"Hi Mr./Ms./Mrs., You have ask to join to FoodTush. We are glad to inform you that, you will be verified using this link. Please click on this link to verify your account http://localhost:3000/auth/verify/{token}/restaurant/"
    else:
        message = f'Hi Mr./Ms./Mrs., You have ask to join to FoodTush. We are glad to inform you that, you will be verified using this link. Please click on this link to verify your account http://localhost:3000/auth/verify/{token}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)

