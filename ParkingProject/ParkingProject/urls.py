"""
Definition of urls for ParkingProject.
"""

from datetime import datetime
from django.urls import path, include
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views


urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('registration/', views.UserRegistration, name='registration'),
    path('places/', views.EmptyPlacesView.as_view(), name='places'),
    path('personal/', views.UserProfileView.as_view(), name='user'),
    path('personal/cars/', views.createAuto, name='create_auto'),
    path('personal/cars/editAuto/<int:id>/', views.editAuto, name='edit_auto'),
    path('personal/cars/deleteAuto/<int:id>/', views.deleteAuto, name='delete_auto'),
    path('personal/places/', views.UserPlacesView.as_view(), name='user_places'),
    path('personal/checks/', views.UserChecksView.as_view(), name='user_checks'),
    path('takeplace/', views.TakePlace, name='take_place'),
    path('personal/upbalance/', views.UpBalance, name='up_balance'),
    path('adminstat/', views.AdminStatistics, name='admin_stat'),
    
    path('accounts/', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
    
]
