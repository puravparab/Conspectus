from django.contrib import admin
from .models import Organization

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
	list_display = [
		"id", "name", "location_city", "location_country", "website", "image",
		 "last_modified", "created_at"
	]

	fields = [
		"name", "location_city", "location_country", "website", "image",
	]

	search_fields = (
		"name", "location_city", "location_country", "website",
	)