from django.shortcuts import render
from App_main.serializers import *
from App_main.models import *
from App_auth.serializers import *
from App_delivery_man.models import *

from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class FindRestaurantAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated ]
    queryset = RestaurantModel.objects.all()
    serializer_class = RestaurantModelSerializer

    def get(self, request, *args, **kwargs):
        queryset = RestaurantModel.objects.filter(root_user=request.user).first()
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


@api_view(['GET'])
def findRestaurant(request):
    restaurant = RestaurantModel.objects.filter(root_user=request.user)
    if restaurant.exists():
        restau = {'name': f"{restaurant[0].restaurant_name}"}
        return Response(restau)
    return Response({"error": "No Restaurant"})


class RestaurantCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated ]
    queryset = RestaurantModel.objects.all()
    serializer_class = RestaurantModelSerializer

    def post(self, request, *args, **kwargs):
        serializer = RestaurantModelSerializer(data=request.data, context={'user':request.user})
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Restaurant Profile'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RestaurantMenuView(CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    queryset = MenuItemsModel.objects.all()
    serializer_class = MenuItemsModelSerializers

    def post(self, request, *args, **kwargs):
        restaurant = RestaurantModel.objects.get(root_user=request.user)
        serializer = MenuItemsModelSerializers(data=request.data, context={'restaurant': restaurant})
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Restaurant menu added'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IsRestaurant(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='RESTAURANT'):
            return True
        return False

class OrderListAPIView(ListAPIView):
    # permission_classes = [IsAuthenticated, ]
    queryset = OrderModel.objects.all()
    serializer_class = OrderModelSerializer

    def get(self, request, restaurant_id, *args, **kwargs):
        queryset = OrderModel.objects.filter(restaurant=restaurant_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated, IsRestaurant])
def order_status_change_api_view(request, order_id, status):
    # order_id = request.data['order_id']
    # status = request.data['status']
    restaurant = RestaurantModel.objects.get(root_user=request.user)
    if request.method == 'POST':
        orders = OrderModel.objects.get(id=int(order_id))
        orders.status = status
        orders.save()
        return Response({"alert": f'Order {status}!!!'})


