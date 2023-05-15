from django.urls import path
from .views import *

app_name = 'organizations'

urlpatterns = [
	path('', organization.as_view(), name='get-organizations')
]