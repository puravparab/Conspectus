from django.contrib import admin
from .models import Organization

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
	list_display = [
		"name", "location_city", "location_country", "website",
		"created_at", "last_modified"
	]

	fields = [
		"name", "location_city", "location_country", "website",
	]

	search_fields = (
		"name", "location_city", "location_country", "website",
	)