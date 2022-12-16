from rest_framework.serializers import ModelSerializer
from App_delivery_man.models import *
import uuid


class DeliveryManProfileModelSerializer(ModelSerializer):
    class Meta:
        model = DeliveryManProfileModel
        fields = "__all__"
        read_only_fields = ['user']

    def create(self, validated_data):
        full_name = validated_data['full_name']
        user = self.context.get('user')
        nid = validated_data['nid']
        primary_phone_number = validated_data['primary_phone_number']
        secondary_phone_number = validated_data['secondary_phone_number']
        profile_picture = validated_data['profile_picture']
        full_home_address = validated_data['full_home_address']
        full_present_address = validated_data['full_present_address']
        area_coverage = validated_data['area_coverage']
        employee_id = str(user.id) +"-"+ str(uuid.uuid4().hex[:6])
        profile = DeliveryManProfileModel.objects.create(user=user,
                                                         full_name=full_name,
                                                         nid=nid,
                                                         primary_phone_number=primary_phone_number,
                                                         secondary_phone_number=secondary_phone_number,
                                                         profile_picture=profile_picture,
                                                         full_home_address=full_home_address,
                                                         full_present_address=full_present_address,
                                                         area_coverage=area_coverage,
                                                         employee_id=employee_id)
        return profile
