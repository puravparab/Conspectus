from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
	class Meta:
		model = Contact
		fields = [
			'name', 'email', 'phone_number', 'workplace', 'current_location_city', 'current_location_country',
			'importance', 'relationship', 'day_met', 'original_location_city', 'original_location_country'
		]