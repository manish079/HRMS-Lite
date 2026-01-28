"""
URL configuration for hr_management project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/employees/', include('employees.urls')),
    path('api/attendance/', include('attendance.urls')),
]
