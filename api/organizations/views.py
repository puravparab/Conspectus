from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Organization
from .serializers import OrganizationSerializer

class organization(APIView):
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

	def post(self, request):
		name = request.data.get("name")

		# Check if entry exists
		organization = Organization.objects.filter(name=name)
		if organization.exists():
			return Response({
				"message": "error organization already exists"
			}, status=status.HTTP_400_BAD_REQUEST)

		location_city = request.data.get("location_city")
		location_country = request.data.get("location_country")
		website = request.data.get("website")

		try:
			organization = Organization.objects.create(
				name = name,
				location_city = location_city,
				location_country = location_country,
				website = website
			)
			organization.save()
			return Response({
				"message": "successfully added organization"
			}, status=status.HTTP_200_OK)

		except Exception as e:
			return Response({
				"error": str(e),
				"message": "error occured while adding organization"
			})