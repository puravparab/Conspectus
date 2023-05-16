from django.urls import path
from .views import *

app_name = 'contacts'

urlpatterns = [
	path('', contact.as_view(), name='contacts'),
	path('<int:id>/', contactDetail.as_view(), name='contacts-detail')
]