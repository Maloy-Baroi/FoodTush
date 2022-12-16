from django.shortcuts import render
from App_delivery_man.models import *
from App_delivery_man.serializers import *
from App_main.models import *
from App_main.serializers import *
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class DeliveryManProfileModelAPIView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = DeliveryManProfileModelSerializer

    def post(self, request, format=None):
        serializer = DeliveryManProfileModelSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid():
            serializer.save()
            return Response({'alert': 'Delivery Man Profile set!!!'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        queryset = DeliveryManProfileModel.objects.get(user=request.user)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


class IsDeliveryMan(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='DELIVERY_MAN'):
            return True
        return False


def is_delivery_man_profile_done(user):
    profile =  DeliveryManProfileModel.objects.filter(user=user)
    if profile.exists():
        return True
    else: return False


class AllMyZoneOrdersAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, IsDeliveryMan]
    queryset = OrderModel.objects.all()
    serializer_class = OrderModelSerializer

    def get(self, request, *args, **kwargs):
        hero = DeliveryManProfileModel.objects.get(user=request.user)
        queryset = OrderModel.objects.filter(restaurant__restaurant_zone=hero.area_coverage)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)



@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated, IsDeliveryMan])
def order_status_change(request, order_id):
    if request.method == 'PUT':
        orders = OrderModel.objects.get(id=order_id)
        orders.status = 'Found_Heros'
        orders.delivery_man = request.user
        orders.save()
        return Response({"alert": 'Found Delivery Hero!!!'})


