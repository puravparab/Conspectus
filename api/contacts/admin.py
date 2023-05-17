from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
	list_display = [
		"id", "name", "phone_number", "email", "workplace", "job", "current_location_city",
		"importance", "relationship", "day_met", "original_location_city",
		"last_modified", "created_at"
	]

	fields = [
		"name", "phone_number", "email", "workplace", "job", "current_location_city", "current_location_country",
		"importance", "relationship", "day_met", "original_location_city", "original_location_country",
	]

	search_fields = (
		"name", "phone_number", "email", "workplace", "job", "current_location_city", "current_location_country",
		"importance", "relationship", "original_location_city", "original_location_country"
	)