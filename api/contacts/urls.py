from django.urls import path
from .views import *

app_name = 'contacts'

urlpatterns = [
	path('', contact.as_view(), name='get-contacts')
]