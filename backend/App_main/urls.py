from django.urls import path, include
from App_main.views import *
from App_main.views import order_update_api_view, order_status_change_api_view

app_name = 'App_main'

urlpatterns = [
    path('restaurants/', RestaurantList.as_view()),
    path('specific-restaurants/<str:restaurant_name>/', SpecificRestaurant.as_view()),
    path('city-restaurants/<str:restaurant_area>/<str:restaurant_city>/', CityRestaurantList.as_view()),
    path('item-restaurants/<str:item_name>/', FoodItemSearchView.as_view()),
    path('service-type-restaurants/<str:restaurant_type>/', TypeSearchRestaurantList.as_view()),
    path('single-restaurant/<int:restau_id>/', SingleRestaurant.as_view()),
    path('all-item-in-menu/<int:restu_id>/', all_item_in_menu),
    path('add-to-cart/', add_to_cart),
    path('order-update-api-view/', order_update_api_view),
    path('cart-view/', CartView.as_view()),
    path('updated-cart-view/', cart_update_view),
    path('order-view/', OrderAPIView.as_view()),
    path('order-status-change-api-view/', order_status_change_api_view),
]
