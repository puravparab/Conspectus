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