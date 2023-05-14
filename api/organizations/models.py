from django.db import models

class Organization(models.Model):
	name = models.CharField(max_length=255)
	location_city = models.CharField(max_length=255, null=True, blank=True)
	location_country = models.CharField(max_length=255, null=True, blank=True)
	website = models.URLField(max_length=255, null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	last_modified = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name