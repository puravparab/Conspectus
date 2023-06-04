from rest_framework import serializers
from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Organization
		fields = [
			"id", "name", "location_city", "location_country", "website", "image",
			"created_at", "last_modified"
		]