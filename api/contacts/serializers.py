from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
	workplace = serializers.SerializerMethodField()

	class Meta:
		model = Contact
		fields = [
		'id', 'name', 'email', 'phone_number', 'workplace', 'job', 'current_location_city', 'current_location_country',
			'importance', 'relationship', 'day_met', 'original_location_city', 'original_location_country'
		]

	def get_workplace(self, instance):
		workplace = instance.workplace
		if workplace is None:
			return None
		return workplace.name if hasattr(workplace, 'name') else None