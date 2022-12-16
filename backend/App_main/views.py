import json
from django.shortcuts import render
from App_main.models import *
from App_main.serializers import *
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from django.db.models import Q
from django.contrib.auth.decorators import login_required
import uuid

from App_auth.models import ProfileModel

# Create your views here.
# Restaurant List


class RestaurantList(ListAPIView):
    permission_class = [AllowAny, ]
    queryset = RestaurantModel.objects.all()
    serializer_class = RestaurantModelSerializer

class SpecificRestaurant(ListAPIView):
    permission_class = [AllowAny]
    queryset = RestaurantModel.objects.all()
    serializer_class = RestaurantModelSerializer

    def get(self, request, restaurant_name):
        queryset = RestaurantModel.objects.filter(
            Q(restaurant_name__icontains=restaurant_name)
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def specific_restaurant(request, restaurant_name):
    rest = RestaurantModel.objects.get(restaurant_name=restaurant_name)
    restaurant_ = {"id": rest.id, 'name': rest.restaurant_name, "address": f"{rest.restaurant_address} {rest.restaurant_area}", "city": {rest.restaurant_city}, "opening": rest.restaurant_open_time, "closing": rest.restaurant_closing_time}
    print(restaurant_)
    return Response(restaurant_)



# Food of specific restrurant
@api_view(['GET', 'POST'])
def all_item_in_menu(request, restu_id):
    restaurant = RestaurantModel.objects.get(id=restu_id)
    menu = MenuItemsModel.objects.filter(restaurant=restaurant)
    menuItems = {}
    menuList = []
    for i in menu:
        # menuItems['id'] = i.id
        # menuItems['Restaurant_name'] = restaurant.restaurant_name
        # menuItems['food_name'] = i.food_name
        # menuItems['food_image'] = "http://localhost:8000/" + i.food_image.url
        # menuItems['food_description'] = i.food_description
        # menuItems['food_pricee'] = i.food_price
        # menuItems['veg'] = i.veg
        # menuItems['vegan'] = i.vegan
        menuList.append({
            'id': i.id,
            'restaurant_id': restu_id,
            'Restaurant_name': restaurant.restaurant_name,
            'food_name': i.food_name,
            'food_image': "http://localhost:8000/" + i.food_image.url,
            'food_description': i.food_description,
            'food_price': i.food_price,
            'veg': i.veg,
            'vegan': i.vegan,
            'rest_image': restaurant.get_main_image(),
        })
    return Response(menuList)


class SingleRestaurant(RetrieveAPIView):
    permission_class = [AllowAny]
    queryset = RestaurantModel.objects.all()
    serializer_class = RestaurantModelSerializer

    def get(self, request, restau_id):
        queryset = RestaurantModel.objects.get(id=restau_id)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)


# Specific city restaurant
class CityRestaurantList(ListAPIView):
    permission_class = [AllowAny]
    queryset = RestaurantModel.objects.all()
    serializer_class = RestaurantModelSerializer

    def get(self, request, restaurant_area, restaurant_city):
        # queryset = RestaurantModel.objects.all()
        print(restaurant_area)
        queryset = RestaurantModel.objects.filter(
            Q(restaurant_zone__icontains=restaurant_area)
            )
        print(queryset)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# Specific restuarant service type
class TypeSearchRestaurantList(ListAPIView):
    permission_class = [AllowAny]
    queryset = RestaurantModel.objects.all()
    serializer_class = RestaurantModelSerializer

    def get(self, request, restaurant_type):
        # queryset = RestaurantModel.objects.all()
        rest_type = str(restaurant_type).replace("-", " ")
        queryset = RestaurantModel.objects.filter(
            restuarant_service_type=rest_type)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# Search Food Item in Different Restaurant
class FoodItemSearchView(ListAPIView):
    permission_class = [AllowAny]
    queryset = MenuItemsModel.objects.all()
    serializer_class = MenuItemsModelSerializers

    def get(self, request, item_name, *args, **kwargs):
        queryset = MenuItemsModel.objects.filter(
            Q(food_name__icontains=item_name))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


def is_profile_done(user):
    profile =  ProfileModel.objects.filter(user=user)
    if profile.exists():
        return True
    else: return False


# Add to Cart
@api_view(['POST', 'GET'])
@permission_classes((IsAuthenticated, )) 
def add_to_cart(request):
    if not is_profile_done(request.user):
        return Response({'error': 'Profile is not completed'})
    if request.method == 'POST':
        pk = request.data['food_menu_id']
        restaurant_id = int(request.data['restaurant_id'])
        print(f"ID: {restaurant_id}, type: {type(restaurant_id)}")
        quantity = int(request.data['quantity'])
        restaurant = RestaurantModel.objects.get(id=restaurant_id)
        food = MenuItemsModel.objects.get(id=pk)
        try:
            cart_item = CartModel.objects.get(
                user=request.user, item=food, purchased=False)
            if cart_item.restaurant.id != restaurant_id:
                print("under If")
                prev = cart_item.restaurant
                total_cart = CartModel.objects.get(user=request.user)
                total_cart.delete()
                cart_new = CartModel.objects.create(
                    user=request.user, restaurant=restaurant,  item=food, quantity=quantity, purchased=False)
                cart_new.save()
                return Response({"Success": f"Previous one was from {prev}, removed. Newly added the food from {restaurant}!!!"})
            cart_item.quantity += quantity
            cart_item.save()
            order = OrderModel.objects.get_or_create(user=request.user, restaurant=restaurant, ordered=False)
            order[0].order_item.add(cart_item)
            order[0].save()
            return Response({"Success": "Cart updated successfully!!!"})
        except:
            print("exception")
            unsolved_orders = OrderModel.objects.filter(user=request.user, ordered=False)
            if unsolved_orders.exists():
                for i in unsolved_orders:
                    if i.restaurant != restaurant:
                        i.delete()
            total_cart = CartModel.objects.filter(user=request.user)
            if total_cart.exists() and total_cart[0].restaurant.id != restaurant_id:
                total_cart.delete()
            cart_item = CartModel.objects.create(
                user=request.user, restaurant=restaurant,  item=food, quantity=quantity, purchased=False)
            cart_item.save()
            order = OrderModel.objects.get_or_create(user=request.user, restaurant=restaurant, ordered=False)
            order[0].order_item.add(cart_item)
            order[0].save()
            return Response({"Success": "Food added to cart successfully!!!"})


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def cart_update_view(request):
    cartID = request.data['cart_id']
    newQuantity = request.data['quantity']
    cart = CartModel.objects.get(id=cartID)
    print(int(newQuantity) == 0)
    if int(newQuantity) == 0:
        cart.delete()
        return Response({'alert': f'food deleted!!!'})
    else:
        cart.quantity = newQuantity
        cart.save()
    return Response({'alert': f'Quantity Updated to {newQuantity}!!!'})


class CartView(ListAPIView):
    permission_class = [IsAuthenticated]
    queryset = CartModel.objects.all()
    serializer_class = CartModelSerializer

    def get(self, request):
        queryset = CartModel.objects.filter(user=request.user.id, purchased=False)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['POST', 'PUT'])
@permission_classes([IsAuthenticated])
def order_update_api_view(request):
    if not is_profile_done(request.user):
        return Response({'error': 'Profile is not completed'})
    if request.method == 'POST':
        billing_address = request.data['delivery_address']
        orders = OrderModel.objects.get(user=request.user, ordered=False, status='In_cart')
        orders.payment_method = 'Cash On Delivery'
        orders.order_id = str(request.user.id) + '__' + str(uuid.uuid4().hex)
        orders.status = 'Requested'
        orders.ordered = True
        orders.billing_address = billing_address
        orders.save()
        for i in orders.order_item.all():
            i.purchased = True
            i.save()
        return Response({"alert": 'Order Successfully Placed!!!'})


class OrderAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderModel.objects.all()
    serializer_class = OrderModelSerializer

    def get(self, request):
        queryset = OrderModel.objects.filter(user=request.user, ordered=True)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class PreviousOrdersAPIVIew(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderModel.objects.all()
    serializer_class = OrderModelSerializer

    def get(self, request):
        queryset = OrderModel.objects.filter(user=request.user, ordered=True, status='Completed')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class PreviousOrdersAPIVIew(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderModel.objects.all()
    serializer_class = OrderModelSerializer

    def get(self, request):
        queryset = OrderModel.objects.filter(user=request.user, ordered=True)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def order_status_change_api_view(request):
    if request.method == 'POST':
        order_id = request.data['order_id']
        order = OrderModel.objects.get(id=order_id)
        order_status = request.data['status']
        order.status = order_status
        order.save()
        return Response({"alert": f"Order status changed to {order_status}"})

