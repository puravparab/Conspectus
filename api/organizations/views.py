from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Organization
from .serializers import OrganizationSerializer

class organization(APIView):
	# Get organization
	def get(self, request, format=None):
		organizations = Organization.objects.all()

		# If no organization can be found
		if not organizations.exists():
			return Response({
				"data": {},
				"message": "No organization found"
			}, status=status.HTTP_404_NOT_FOUND)

		serializer = OrganizationSerializer(organizations, many=True)
		return Response({
			"data": serializer.data,
			"message": "Organization(s) retrieved successfully"
		}, status=status.HTTP_200_OK)

	# Add an organization
	def post(self, request):
		data = request.data.get("organizations")

		if data == []:
			return Response({
				"message": "No organizations added"
			}, status=status.HTTP_400_BAD_REQUEST)

		for org in data:
			name = org["name"]
			
			organization = Organization.objects.filter(name=name)

			# Check if entry exist
			if organization.exists():
				return Response({
					"message": f'error {name} already exists'
				}, status=status.HTTP_400_BAD_REQUEST)

			location_city = org["location_city"]
			location_country = org["location_country"]
			website = org["website"]

			try:
				organization = Organization.objects.create(
					name = name,
					location_city = location_city,
					location_country = location_country,
					website = website
				)
				organization.save()
			except Exception as e:
				return Response({
					"error": str(e),
					"message": "error occured while adding organization"
				})

		return Response({
			"message": "successfully added organization"
		}, status=status.HTTP_200_OK)

	# Update Organization
	def put(self, request):
		name = request.data.get("name")
		if name.strip() == "":
			return Response({
				"message": "name empty"
			}, status=status.HTTP_400_BAD_REQUEST)

		organization = Organization.objects.filter(name=name)

		# Check if entry does not exists
		if not organization.exists():
			return Response({
				"message": "error organization does not exist"
			}, status=status.HTTP_400_BAD_REQUEST)

		try:
			organization = organization[0]
			update_list = []
			if name:
				organization.name = name
				update_list.append("name")

			location_city = request.data.get("location_city")
			if location_city:
				organization.location_city = location_city
				update_list.append("location_city")

			location_country = request.data.get("location_country")
			if location_country:
				organization.location_country = location_country
				update_list.append("location_country")

			website = request.data.get("website")
			if website:
				organization.website = website
				update_list.append("website")

			organization.save(update_fields=update_list)
			return Response({
				"message": "organization successfully updated"
			}, status=status.HTTP_200_OK)

		except Exception as e:
			return Response({
				"error": str(e),
				"message": "error organization update failed "
			}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)