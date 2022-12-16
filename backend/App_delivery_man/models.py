from random import choices
from secrets import choice
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models
from django.core.validators import *
from App_auth.models import CustomUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _

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


class DeliveryManProfileModel(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='delivery_man_profile')
    employee_id = models.CharField(max_length=10, default=0)
    full_name = models.CharField(max_length=255)
    nid = models.CharField(max_length=17)
    primary_phone_number = models.CharField(
        validators=[phone_regex], verbose_name=_("Mobile phone"), max_length=17)
    secondary_phone_number = models.CharField(validators=[phone_regex], verbose_name=_(
        "Mobile phone"), max_length=17, blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to='delivery_man_profile_pic/', blank=True, null=True)
    full_home_address = models.CharField(max_length=100, blank=True)
    full_present_address = models.CharField(max_length=100, blank=True)
    area_coverage = models.TextField()
    date_joined = models.DateTimeField(auto_now=True)
    busy = models.BooleanField(default=False)
    active = models.BooleanField(default=False)

    def __str__(self):
        return f"Delivery Man: {self.full_name}\' Profile"

    def get_profile_picture(self):
        picture = 'http://localhost:8000/'+str(self.profile_picture.url)
        return picture
