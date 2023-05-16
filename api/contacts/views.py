from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Contact
from .serializers import ContactSerializer

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