from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Contact
from .serializers import ContactSerializer
from organizations.models import Organization

class contact(APIView):
	def get(self, request, format=None):
		contacts = Contact.objects.all()

		# If no contacts can be found
		if not contacts.exists():
			return Response({
				"data": {},
				"message": "No contacts found"
			}, status=status.HTTP_404_NOT_FOUND)

		serializer = ContactSerializer(contacts, many=True)
		return Response({
			"data": serializer.data,
			"message": "Contacts retrieved successfully"
		}, status=status.HTTP_200_OK)

	# Add a contact
	def post(self, request):
		data = request.data.get("contacts")

		if data == []:
			return Response({
				"message": "No contact added"
			}, status=status.HTTP_400_BAD_REQUEST)

		for contactData in data:
			name = contactData["name"]
			
			contact = Contact.objects.filter(name=name)

			email = contactData["email"]
			phone_number = contactData["phone_number"]
			current_location_city = contactData["current_location_city"]
			current_location_country = contactData["current_location_country"]
			importance = contactData["importance"]
			relationship = contactData["relationship"]
			day_met = contactData["day_met"]
			original_location_city = contactData["original_location_city"]
			original_location_country = contactData["original_location_country"]
			workplace = contactData["workplace"]

			# Add workplace
			organization = Organization.objects.filter(name=workplace)
			if organization.exists():
				workplace = organization[0]
			else:
				workplace = None

			try:
				contact = Contact.objects.create(
					name = name,
					email = email,
					phone_number = phone_number,
					current_location_city = current_location_city,
					current_location_country = current_location_country,
					importance = importance,
					relationship = relationship,
					day_met = day_met,
					original_location_city = original_location_city,
					original_location_country = original_location_country,
					workplace = workplace
				)
				contact.save()
			except Exception as e:
				return Response({
					"error": str(e),
					"message": "error occured while adding contacts"
				})

		return Response({
			"message": "successfully added contact"
		}, status=status.HTTP_200_OK)