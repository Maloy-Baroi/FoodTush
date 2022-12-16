from django.urls import path
from App_delivery_man.views import *

urlpatterns = [
    path('delivery-man-profile-create/', DeliveryManProfileModelAPIView.as_view()),
    path('zone-based-orders/', AllMyZoneOrdersAPIView.as_view()),
    path('order-status-change/', order_status_change),
]

