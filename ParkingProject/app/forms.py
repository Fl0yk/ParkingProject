"""
Definition of forms.
"""

from urllib import request
from django import forms
from .models import User, Auto, ParkingPlace
from django.core.validators import RegexValidator


def validate_name(value):
    if User.objects.filter(username=value).exists():
        raise forms.ValidationError('Name is already taken', params={'value' : value})

def validate_mail(value):
    if User.objects.filter(email=value).exists():
        raise forms.ValidationError('Email is already taken', params={'value' : value})

class ClientForm(forms.Form):
    num_validetor = RegexValidator(regex=r"^\+375 \(29\) \d{3}-\d{2}-\d{2}$")

    name = forms.CharField(max_length=20, min_length=2, validators=[validate_name])
    mail = forms.EmailField(max_length=30, min_length=5, validators=[validate_mail])
    number = forms.CharField(max_length=20, validators=[num_validetor], help_text="+375 (29) xxx-xx-xx")
    first_password = forms.CharField(widget=forms.PasswordInput())
    second_password = forms.CharField(widget=forms.PasswordInput())
    
    def clean_second_password(self):
        f_pass = self.cleaned_data['first_password']
        s_pass = self.cleaned_data['second_password']
        if(f_pass != s_pass):
            raise forms.ValidationError('Password is not equals')
        

class CarForm(forms.Form):
    num_validetor = RegexValidator(regex=r"^\d{4}\s\w{2}-\d$")

    num = forms.CharField(max_length=9, validators=[num_validetor], help_text="1111 AA-7")
    model = forms.CharField(max_length=20, min_length=2)
    brand = forms.CharField(max_length=20, min_length=2)
    
    def clean(self):
        in_num = self.cleaned_data['num']
        in_model = self.cleaned_data['model']
        in_brand = self.cleaned_data['brand']
        if Auto.objects.filter(num=in_num).exists() and not Auto.objects.filter(model=in_model, brand=in_brand).exists():
            raise forms.ValidationError('A car with the same number exists, but the brand or model does not match')
        

class BalanceForm(forms.Form):
    money = forms.DecimalField(min_value=0.01, max_value=1000, max_digits=6, decimal_places=2)
    cupon = forms.CharField(max_length=10, min_length=2, required=False)
    
    def clean_cupon(self):
        pass
            