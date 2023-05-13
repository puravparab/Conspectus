from django.db import models

# Contact Model
class Contact(models.Model):
	# Personal details
	name = models.CharField(max_length=255)
	phone_number = models.CharField(max_length=20, null=True, blank=True)
	email = models.EmailField(null=True, blank=True)
	# Social media
	# workplace
	current_location_city = models.CharField(max_length=255, null=True, blank=True)
	current_location_country = models.CharField(max_length=255, null=True, blank=True)

	# Relationship details
	importance = models.CharField(max_length=255, null=True, blank=True)
	relationship = models.CharField(max_length=255, null=True, blank=True)
	day_met = models.DateField(null=True)
	original_location_city = models.CharField(max_length=255, null=True, blank=True)
	original_location_country = models.CharField(max_length=255, null=True, blank=True)

	last_modified = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name