from django.urls import path
from App_restaurant.views import *

urlpatterns = [
    path('restaurant-create/', RestaurantCreateAPIView.as_view()),
    path('find-restaurant/', findRestaurant),
    path('restaurant-menu-create/', RestaurantMenuView.as_view()),
    path('restaurant-order-list/<int:restaurant_id>/', OrderListAPIView.as_view()),
    path('order-status-change-api-view/<str:order_id>/<str:status>/', order_status_change_api_view),
]

