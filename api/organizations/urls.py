from django.urls import path
from .views import *

app_name = 'organizations'

urlpatterns = [
	path('', organization.as_view(), name='organizations-api'),
	path('<int:id>/', organizationDetail.as_view(), name='organizations-detail')
]