from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Contact
from .serializers import ContactSerializer
from organizations.models import Organization

class contact(APIView):
	# Get all contacts
	def get(self, request, format=None):
		contacts = Contact.objects.all()

		# If no contacts can be found
		if not contacts.exists():
			return Response({
				"data": {},
				"message": "No contacts found"
			}, status=status.HTTP_404_NOT_FOUND)

		# Get contacts
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

		# Iterate through all contacts and add them to the database
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
			job = contactData["job"]

			# Add workplace
			organization = Organization.objects.filter(id=workplace)
			if organization.exists():
				workplace = organization[0]
			else:
				workplace = None

			# Add contact to database
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
					workplace = workplace,
					job=job
				)
				contact.save()
			except Exception as e:
				return Response({
					"error": str(e),
					"message": "error occured while adding contacts"
				}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		return Response({
			"message": "successfully added contact"
		}, status=status.HTTP_200_OK)


class contactDetail(APIView):
	# Get specific contact
	def get(self, request, id, format=None):
		contact = Contact.objects.filter(id=id)

		# If contact does not exist
		if not contact.exists():
			return Response({
				"data": {},
				"message": "This contact does not exist"
			}, status=status.HTTP_404_NOT_FOUND)

		# Get contact
		serializer = ContactSerializer(contact, many=True)
		return Response({
			"data": serializer.data,
			"message": "Contact successfully retrieved"
		}, status=status.HTTP_200_OK)

	# update specific contact
	def put(self, request, id, format=None):
		contact = Contact.objects.filter(id=id)

		# If contact does not exist in db
		if not contact.exists():
			return Response({
				"message": "error organization does not exist"
			}, status=status.HTTP_400_BAD_REQUEST)

		# Update entries of specified contact
		try:
			contact = contact[0]
			update_list = []

			name = request.data.get("name")
			if name:
				contact.name = name

			email = request.data.get("email")
			if email:
				contact.email = email

			phone_number = request.data.get("phone_number")
			if phone_number:
				contact.phone_number = phone_number

			current_location_city = request.data.get("current_location_city")
			if current_location_city:
				contact.current_location_city = current_location_city

			current_location_country = request.data.get("current_location_country")
			if current_location_country:
				contact.current_location_country = current_location_country

			importance = request.data.get("importance")
			if importance:
				contact.importance = importance

			relationship = request.data.get("relationship")
			if relationship:
				contact.relationship = relationship

			day_met = request.data.get("day_met")
			if day_met:
				contact.day_met = day_met

			original_location_city = request.data.get("original_location_city")
			if original_location_city:
				contact.original_location_city = original_location_city

			original_location_country = request.data.get("original_location_country")
			if original_location_country:
				contact.original_location_country = original_location_country

			# Get organization
			workplace = request.data.get("workplace")
			if workplace:
				organization = Organization.objects.filter(id=workplace)
				if organization.exists():
					workplace = organization[0]
				else:
					workplace = None
				contact.workplace = workplace

			job = request.data.get("job")
			if job:
				contact.job = job

			contact.save()
			return Response({
				"message": "contact successfully updated"
			}, status=status.HTTP_200_OK)

		except Exception as e:
			return Response({
				"error": str(e),
				"message": "error contact update failed "
			}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)