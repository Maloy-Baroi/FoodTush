from dataclasses import field, fields
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from App_main.models import *
from App_auth.models import *


class MenuItemsModelSerializers(ModelSerializer):
    class Meta:
        model = MenuItemsModel
        exclude = ['restaurant']

    def create(self, validated_data):
        restaurant = self.context.get('restaurant')
        food_name = validated_data['food_name']
        food_image = validated_data['food_image']
        food_description = validated_data['food_description']
        food_price = validated_data['food_price']
        veg = validated_data['veg']
        vegan = validated_data['vegan']

        menu = MenuItemsModel.objects.create(restaurant=restaurant,
                                             food_name=food_name,
                                             food_image=food_image,
                                             food_description=food_description,
                                             food_price=food_price,
                                             veg=veg,
                                             vegan=vegan)
        return menu

class RestaurantModelSerializer(ModelSerializer):
    rest_rating = serializers.StringRelatedField(many=True)
    class Meta:
        model = RestaurantModel
        fields = ["id",
                  "root_user",
                  "restaurant_name",
                  "restaurant_owner_name",
                  "restaurant_phone_number",
                  "restaurant_address",
                  "restaurant_area",
                  "restaurant_city",
                  "restaurant_country",
                  "restaurant_open_time",
                  "restaurant_closing_time",
                  "restaurant_type",
                  "restuarant_service_type",
                  "restaurant_registration_date",
                  'image',
                  "get_main_image",
                  "terms_and_conditions",
                  'rest_rating'
                  ]
        read_only_fields = ['root_user', 'get_main_image', 'rest_rating', 'restaurant_registration_date']

    def create(self, validated_data):
        root_user = self.context.get('user')
        restaurant_name = validated_data['restaurant_name']
        restaurant_owner_name = validated_data['restaurant_owner_name']
        restaurant_phone_number = validated_data['restaurant_phone_number']
        restaurant_address = validated_data['restaurant_address']
        restaurant_area = validated_data['restaurant_area']
        restaurant_city = validated_data['restaurant_city']
        restaurant_country = validated_data['restaurant_country']
        restaurant_open_time = validated_data['restaurant_open_time']
        restaurant_closing_time = validated_data['restaurant_closing_time']
        restaurant_type = validated_data['restaurant_type']
        restuarant_service_type = validated_data['restuarant_service_type']
        terms_and_conditions = validated_data['terms_and_conditions']
        image = validated_data['image']
        if terms_and_conditions:
            resta = RestaurantModel.objects.create(root_user=root_user,
                                                   restaurant_name=restaurant_name,
                                                   restaurant_owner_name=restaurant_owner_name,
                                                   restaurant_phone_number=restaurant_phone_number,
                                                   restaurant_address=restaurant_address,
                                                   restaurant_area=restaurant_area,
                                                   restaurant_city=restaurant_city,
                                                   restaurant_country=restaurant_country,
                                                   restaurant_open_time=restaurant_open_time,
                                                   restaurant_closing_time=restaurant_closing_time,
                                                   restaurant_type=restaurant_type,
                                                   restuarant_service_type=restuarant_service_type,
                                                   image=image,
                                                   terms_and_conditions=True)
            return resta

class RestaurantRatingModelSerializer(ModelSerializer):
    class Meta:
        model = RestaurantRatingModel
        fields = "__all__"


class CartModelSerializer(ModelSerializer):
    class Meta:
        model = CartModel
        fields = ['id', 'get_total', 'get_user', 'get_restaurant', 'get_food_name', 'get_food_price', "purchased", "created",
                  "updated", "user", "restaurant", "item", "quantity"]
        read_only_fields = ["user",
                            "restaurant",
                            "item",
                            "get_user",
                            "get_restaurant",
                            "get_food_name",
                            ]


class CartModelUpdateSerializer(ModelSerializer):
    class Meta:
        model = CartModel
        fields = ['get_total', 'get_user', 'get_restaurant', 'get_food_name', "purchased", "created",
                  "updated", "user", "restaurant", "item", "quantity"]
        read_only_fields = ['get_total', 'get_user', 'get_restaurant', 'get_food_name', "created",
                            "updated", "user", "restaurant", "item", "quantity"]


class CustomizedUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email']


# class OrderModelSerializer(ModelSerializer):
#     order_item = CartModelSerializer(many=True)
#     user = CustomizedUserModelSerializer()

#     class Meta:
#         model = OrderModel
#         fields = ['order_item', 'user', 'ordered', 'restaurant', 'created', 'order_id',
#                   'payment_method', 'get_totals']
#         depth = 1


class OrderModelSerializer(ModelSerializer):
    order_item = CartModelSerializer(many=True)
    user = CustomizedUserModelSerializer()

    class Meta:
        model = OrderModel
        fields = ['id', 'order_item', 'user', 'ordered', 'restaurant', 'created', 'order_id',
                  'payment_method', 'get_totals', 'status', 'billing_address']
        depth = 1


class SingleOrderModelSerializer(ModelSerializer):
    order_item = CartModelSerializer(many=True)
    user = CustomizedUserModelSerializer()

    class Meta:
        model = OrderModel
        fields = ['order_item', 'user', 'ordered', 'restaurant', 'created', 'order_id',
                  'payment_method', 'get_totals']
        depth = 1

