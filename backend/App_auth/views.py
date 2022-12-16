import imp
from django.shortcuts import render
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework import renderers
from App_auth.models import *
from App_auth.serializers import *
from App_main.models import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
import json

from App_auth.serializers import RegisterSerializer


# Create your views here.
class RegisterAPIView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['POST'])
def registerAPIView(request):
    if request.method == 'POST':
        groups = str(request.data['groups']).upper()
        email = request.data['email']
        password = request.data['password']
        password2 = request.data['password2']
        user = CustomUser(email=email)
        if password == password2:
            user.set_password(password)
            user.save()
            grp = Group.objects.get_or_create(name=groups)
            grp[0].user_set.add(user)
            return Response({"Success": "Successfully registered!!!", 'group': groups})
        else:
            return Response({"Error": "Password and Confirm password should be same!!!"})



def getToken(user):
    refreshToken = RefreshToken.for_user(user)
    return {
        'refresh': str(refreshToken),
        'access': str(refreshToken.access_token)
    }


class UserRendering(renderers.JSONRenderer):
    charset = 'utf-8'
    
    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'error': data})
        else:
            response = json.dumps(data)

        return response


class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='CUSTOMER'):
            return True
        return False


def is_customer(user):
    return user.groups.filter(name="CUSTOMER").exists()

def is_restaurant(user):
    return user.groups.filter(name="RESTAURANT").exists()

def is_delivery_man(user):
    return user.groups.filter(name="DELIVERY_MAN").exists()


class UserLoginView(APIView):
    renderer_classes = [UserRendering]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            token = getToken(user)
            if is_customer(user):
                user_group = 'customer'
            elif is_restaurant(user):
                user_group = 'restaurant'
                restaurant = RestaurantModel.objects.filter(root_user=user)
                if restaurant.exists():
                    rest = f"{restaurant[0].id}"
                    return Response({'token': token, 'alert': 'Login Success', 'user_group':user_group, 'restaurant_id': rest}, status=status.HTTP_200_OK)
                else:
                    return Response({'token': token, 'alert': 'Login Success', 'user_group':user_group, 'restaurant_id': 'None'}, status=status.HTTP_200_OK)
            elif is_delivery_man(user):
                user_group = 'delivery_man'
            else:
                return Response({'alert':'Login Error'})
            return Response({'token': token, 'alert': 'Login Success', 'user_group':user_group}, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    renderer_classes = [UserRendering]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'alert': 'Password has been changed successfully'}, status=status.HTTP_200_OK)



class UserProfileModelAPIView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, ]
    # queryset = ProfileModel.objects.all()
    serializer_class = ProfileModelSerializer

    def get(self, request, *args, **kwargs):
        queryset = ProfileModel.objects.get(user=request.user)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProfileModelSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid():
            serializer.save()
            return Response({'alert': 'Profile set.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def put()


@api_view(['POST'])
# @permission_classes(['IsAuthenticated'])
def profile_update_api_view(request):
    if request.method == 'POST':
        profile = ProfileModel.objects.get(user=request.user)
        profile.full_name = request.data['full_name']
        profile.phone_number = request.data['phone_number']
        try:
            profile.profile_picture = request.FILES['profile_picture']
        except:
            print("File not Found")
        profile.house = request.data['house']
        profile.area = request.data['area']
        profile.city = request.data['city']
        profile.save()
        
        return Response({"success": "Successfully Updated!!!"})
    return Response({"error": "Update failed"})
