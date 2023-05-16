from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
	workplace = serializers.CharField(source='workplace.name')

	class Meta:
		model = Contact
		fields = [
		'id', 'name', 'email', 'phone_number', 'workplace', 'current_location_city', 'current_location_country',
			'importance', 'relationship', 'day_met', 'original_location_city', 'original_location_country'
		]