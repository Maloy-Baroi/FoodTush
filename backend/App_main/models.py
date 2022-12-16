from distutils.command.upload import upload
from email.policy import default
from hashlib import blake2b
from operator import mod
from random import choices
from wsgiref.validate import validator
from django.db import models

from App_auth.models import CustomUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# Create your models here.
phone_regex = RegexValidator(
    regex=r"^\+?(88)01[3-9][0-9]{8}$", message=_('Must add 880'))

cities_of_bd = (
    ('Dhaka', 'Dhaka'),
    ('Chattogram', 'Chattogram'),
    ('Khulna', 'Khulna'),
    ('Barishal', 'Barishal'),
    ('Rajshahi', 'Rajshahi'),
    ('Rongpur', 'Rongpur'),
    ('Sylhet', 'Sylhet'),
    ('Mymensingh', 'Mymensingh'),
)

class RestaurantModel(models.Model):
    root_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    restaurant_name = models.CharField(max_length=256)
    restaurant_owner_name = models.CharField(max_length=100)
    restaurant_phone_number = models.CharField(max_length=15, validators=[phone_regex])
    restaurant_address = models.CharField(max_length=100)
    restaurant_area = models.CharField(max_length=100)
    restaurant_city = models.CharField(max_length=100, choices=cities_of_bd)
    restaurant_country = models.CharField(max_length=100)
    restaurant_zone = models.CharField(max_length=255, blank=True)
    restaurant_open_time = models.TimeField()
    restaurant_closing_time = models.TimeField()
    restaurant_type = models.CharField(max_length=100)
    restuarant_service_type = models.CharField(max_length=100, default="Order Online")
    restaurant_registration_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='restaurant_main_image', blank=True)
    terms_and_conditions = models.BooleanField(default=False)

    def __str__(self):
        return self.restaurant_name

    def get_main_image(self):
        if self.image:
            image_path = "http://127.0.0.1:8000"+self.image.url
        else:
            image_path = "No Image"
        return image_path


class MenuItemsModel(models.Model):
    restaurant = models.ForeignKey(RestaurantModel, on_delete=models.CASCADE, related_name='rest_menu')
    food_name = models.CharField(max_length=100)
    food_image = models.ImageField(upload_to='food_image', blank=True, null=True)
    food_description = models.TextField(blank=True, null=True)
    food_price = models.PositiveIntegerField()
    veg = models.BooleanField(default=False)
    vegan = models.BooleanField(default=False)

    def __str__(self):
        return self.food_name

class RestaurantMenuModel(models.Model):
    restaurant_one = models.ForeignKey(RestaurantModel, on_delete=models.CASCADE, related_name='rest_special_menu')
    special_offer = models.ImageField(upload_to='restaurant_offer_menu/')
    days = models.CharField(max_length=20, blank=True, null=True)
    validate_until = models.DateField(blank=True, null=True)


likes_dislikes_parameter = (
    ('-1', 'Negative'),
    ('0', 'No review'),
    ('1', 'Positive')
)

class RestaurantRatingModel(models.Model):
    restaurant_model = models.ForeignKey(RestaurantModel, on_delete=models.CASCADE, related_name='rest_rating')
    like_or_dislike = models.CharField(max_length=20, choices=likes_dislikes_parameter)
    total_ordered = models.PositiveIntegerField(default=0)

    def __str__(self):
        like = int(self.like_or_dislike)
        totalOrder = int(self.total_ordered)
        return f"{like/totalOrder}"

class RestaurantImagesModel(models.Model):
    restaurant_model = models.ForeignKey(RestaurantModel, on_delete=models.CASCADE, related_name='rest_images')
    image_1 = models.ImageField(upload_to='restaurant_image/')
    image_2 = models.ImageField(upload_to='restaurant_image/', blank=True)
    image_3 = models.ImageField(upload_to='restaurant_image/', blank=True)
    image_4 = models.ImageField(upload_to='restaurant_image/', blank=True)
   
    
class CartModel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='cart')
    restaurant = models.ForeignKey(RestaurantModel, on_delete=models.CASCADE, related_name='added_cart_restaurant')
    item = models.ForeignKey(MenuItemsModel, on_delete=models.CASCADE, related_name='menu_item_in_cart')
    quantity = models.IntegerField(default=1)
    purchased = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.quantity} x {self.item.food_name}'

    def get_total(self):
        total = float(self.item.food_price * self.quantity)
        return format(total, '0.2f')
    
    def get_food_price(self):
        return format(self.item.food_price, '0.2f')

    def get_user(self):
        return self.user.email

    def get_restaurant(self):
        return self.restaurant.restaurant_name

    def get_food_name(self):
        return self.item.food_name

    def get_added_date(self):
        return self.created.date


status_choice = (
    ('In_cart', 'In_cart'),
    ('Requested', 'Requested'), # Customer 
    ('Accepted', 'Accepted'), # Restaurant
    ('Processing', 'Processing'), # Restaurant
    ('Rejected', 'Rejected'), # Restaurant
    ('Collected', 'Collected'), # Delivery Man
    ('Found_Heros', 'Found_Heros'), # Delivery Man
    ('Delivered', 'Delivered'), # Delivery Man
    ('Completed', 'Completed'), # Customer
)


class OrderModel(models.Model):
    order_item = models.ManyToManyField(CartModel)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='order')
    billing_address = models.TextField(blank=True)
    restaurant = models.ForeignKey(RestaurantModel, on_delete=models.CASCADE, related_name='order_restaurant', blank=True)
    ordered = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=264, default='Cash On Delivery')
    order_id = models.CharField(max_length=264, blank=True, null=True)
    status = models.CharField(max_length=20, default="In_cart", choices=status_choice)
    delivery_man = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='delivery_man_of_order', blank=True, null=True)

    def get_totals(self):
        total_items = self.order_item.all()
        total = 0
        for i in total_items:
            total += (i.quantity * i.item.food_price)
        return format(total, '0.2f')

