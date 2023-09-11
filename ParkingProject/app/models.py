import email
import re
import uuid
from wsgiref.validate import validator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.core.validators import RegexValidator


class ParkingPlace(models.Model):
    isEmpty = models.BooleanField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    auto = models.OneToOneField('Auto', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = "Parking place"
        verbose_name_plural = "Parking places"
        ordering = ['price']

    def __str__(self) -> str:
        return str(self.pk)
    
class Check(models.Model):
    dateOfActual = models.DateField(auto_now_add=True)
    place = models.ForeignKey(ParkingPlace, on_delete=models.SET_NULL, null=True, blank=True)
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "Check"
        verbose_name_plural = "Checks"

    def __str__(self) -> str:
        return str(self.id) + ", date: " + str(self.dateOfActual) + ", place: " + str(self.place)


class Auto(models.Model):
    num_validator = RegexValidator(regex=r"^\d{4}\s\w{2}-\d$")    

    num = models.CharField(max_length=9, validators=[num_validator], help_text="1111 AA-1", unique=True)
    brand = models.CharField(max_length=20)
    model = models.CharField(max_length=20)

    class Meta:
        verbose_name = "Car"
        verbose_name_plural = "Cars"
        ordering = ['num', 'brand', 'model']

    def __str__(self) -> str:
        return "Number: " + self.num + ", brand: " + self.brand + ", model: " + self.model
    
    def display_users(self):
        return ', '.join([ user.username for user in self.users.all()[:3] ])
    display_users.short_description = 'Users'
    
class User(AbstractUser):
    num_validetor = RegexValidator(regex=r"^\+375 \(29\) \d{3}-\d{2}-\d{2}$")

    #name = models.CharField(max_length=20)
    number = models.CharField(max_length=20, validators=[num_validetor], help_text='+375 (29) xxx-xx-xx')
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    cars = models.ManyToManyField(Auto, related_name='users', blank=True)

    class Meta:
        verbose_name = "Client"
        verbose_name_plural = "Clients"

    def __str__(self) -> str:
        return str(self.username) + " " + str(self.number)
    
class News(models.Model):
    title = models.CharField(max_length=30)
    text = models.TextField()

class Coupon(models.Model):
    value = models.CharField(max_length=20, primary_key=True)
    bonus = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    is_used = models.BooleanField(default=False)

class Vacancy(models.Model):
    job_title = models.CharField(max_length=40)
    salary = models.DecimalField(max_digits=6, decimal_places=2) #зарплата
    description = models.TextField()
    
    class Meta:
        verbose_name = 'Vacancy'
        verbose_name_plural = "Vacancies"
    

class Review(models.Model):     #отзыв
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=30)
    text = models.TextField()

class Employee(models.Model):
    client = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    vacancy = models.OneToOneField(Vacancy, on_delete=models.SET_NULL, null=True)