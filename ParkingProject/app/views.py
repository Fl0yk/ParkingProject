"""
Definition of views.
"""
import requests
import random
import logging

from datetime import datetime
from plotly.graph_objects import Bar, Layout, Figure

from django.shortcuts import render
from django.urls import reverse
from django.http import HttpRequest

from django.contrib.auth.hashers import make_password
from django.http import Http404, HttpResponseRedirect
from django.views import generic, View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from .models import ParkingPlace, Check, Auto, Vacancy, Employee, News, Coupon, User

from .forms import ClientForm, CarForm, BalanceForm


logger = logging.getLogger(__name__)

def home(request):
    now = datetime.now()
    url = 'https://official-joke-api.appspot.com/random_joke'
    try:
        res = requests.get(url).json()

        joke_setup = res['setup']
        joke_punch = res['punchline']
    except:
        joke_setup = 'There will be no joke('
        joke_punch = ''
    
    num_empty_placces = ParkingPlace.objects.filter(isEmpty__exact=True).count()

    return render(
        request,
        "app/index.html",  # Relative path from the 'templates' folder to the template file
        # "index.html", # Use this code for VS 2017 15.7 and earlier
        {
            'content' : now.strftime("%d/%m/%y"),
            'num_empty_placces' : num_empty_placces,
            'setup' : joke_setup,
            'punch' : joke_punch
        } 
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    url = 'https://pokeapi.co/api/v2/pokemon/' + str(random.randint(1, 1010))
    res = requests.get(url).json()

    pokemon_name = res['name']
    pokemon_image = res['sprites']['front_default']
    return render(
        request,
        "app/about.html",
        {
            'title' : "Bobik",
            'name' : pokemon_name,
            'image' : pokemon_image
        }
    )


def UserRegistration(request):
    if request.method == "POST":
        clientForm = ClientForm(request.POST)
        if clientForm.is_valid():
            user = User()
            user.username = clientForm.cleaned_data['name']
            user.email = clientForm.cleaned_data['mail']
            user.password = make_password(clientForm.cleaned_data['first_password'])
            user.balance = 0
            user.number = clientForm.cleaned_data['number']
            user.save()
            request.user = user
            logger.info(f'Registration new user {user.id}: {user.username}')
            return HttpResponseRedirect(reverse('login'))
        else:
            logger.error('Failed to registration user')
    else:
        clientForm = ClientForm()

    return render(
            request,
            'app/registration.html',
            context={'form' : clientForm, })


class EmptyPlacesView(generic.ListView):
    model = ParkingPlace
    template_name = 'app/empty_place_list.html'

    def get_queryset(self):
        return ParkingPlace.objects.filter(isEmpty__exact=True)
    

@method_decorator(login_required, name='dispatch')
class UserProfileView(View):
    @staticmethod
    def get(request):
        try:
            client = User.objects.get(username=request.user.username)
        except User.DoesNotExist:
            raise Http404('Client not found')

        return render(
            request,
            'app/personal_page.html',
            context={'client' : client, })
    

#Car CRUD
@login_required
def createAuto(request):
    client = User.objects.get(username=request.user.username)

    if request.method == 'POST':
        form = CarForm(request.POST)
        if form.is_valid():
            number = form.cleaned_data['num']
            if Auto.objects.filter(num=number).exists():
                car = Auto.objects.filter(num=number).first()
                if(client.cars.filter(num=number).exists()):
                    message = 'You have already been accepted for this car'
                else:
                    client.cars.add(car)
                    message = f'You were tied to a car with a license plate {car.num}'
                    
                return render(request, 
                          'app/user_cars.html', 
                          {'object_list' : client.cars.all(), 
                           'form' : form,
                           'message': message}
                          )
            car = Auto()
            car.num = number
            car.model = form.cleaned_data['model']
            car.brand = form.cleaned_data['brand']
            car.save()
            client.cars.add(car)
            logger.info(f'User {client.username} create new car')
        else:
            logger.error(f'Failed to create new car by {client.username}')
    else:
        form = CarForm()

    return render(request, 
                  'app/user_cars.html', 
                  {'object_list' : client.cars.all(), 
                   'form' : form }
                 )

@login_required
def editAuto(request, id):
    try:
        car = Auto.objects.get(id=id)
        if request.method == 'POST':
            form = CarForm(request.POST)
            car.model = form.cleaned_data['model']
            car.brand = form.cleaned_data['brand']
            car.save()
            logger.info(f'Edit car by {request.user.username}')
            return HttpResponseRedirect(reverse('create_auto'))
        else:
            form = CarForm()
            
        return render(request, 'app/edit_auto.html',
                        {'car' : car,
                        'form': form })

    except Auto.DoesNotExist:
        logger.info(f'Auto does not exist by {request.user.username}')
        raise Http404('Auto not found')

@login_required
def deleteAuto(request, id):
    try:
        car = Auto.objects.get(id=id)
        if ParkingPlace.objects.filter(auto=car).exists():
            place = ParkingPlace.objects.filter(auto=car).get()
            place.isEmpty = True
            place.save()
        car.delete()
        logger.info(f'Delete auto by {request.user.username}')
        return HttpResponseRedirect('/personal/cars')
    except Auto.DoesNotExist:
        logger.info(f'Auto does not exist by {request.user.username}')
        raise Http404('Auto not found')
    
#End car CRUD

@method_decorator(login_required, name='dispatch')
class UserPlacesView(generic.ListView):
    model = ParkingPlace
    template_name = 'app/user_places.html'

    def get_queryset(self):
        client = self.request.user
        return ParkingPlace.objects.filter(auto__in=client.cars.all())

@method_decorator(login_required, name='dispatch')
class UserChecksView(generic.ListView):
    model = Auto
    template_name = 'app/user_checks.html'

    def get_queryset(self):
        client = self.request.user
        return client.check_set.all()
    

@login_required
def TakePlace(request):
    if request.method == "POST":
        try:
            car = Auto.objects.filter(id=request.POST.get('carId')).get()
            place = ParkingPlace.objects.filter(id=request.POST.get('placeId')).get()
            place.auto = car
            place.isEmpty = False
            place.save()
            logger.info(f'User {request.user.username} take a place')
        except Auto.DoesNotExist:
            logger.info(f'Auto does not exist by {request.user.username}')
            raise Http404('Auto not found')
        except ParkingPlace.DoesNotExist:
            logger.info(f'Parking place does not exist by {request.user.username}')
            raise Http404('Parking place not found')
        
    user_cars = request.user.cars.filter(parkingplace__exact=None)
    empty_place = ParkingPlace.objects.filter(isEmpty__exact=True)
    return render(
            request,
            'app/take_place.html',
            context={'cars' : user_cars,
                     'places' : empty_place })


@login_required
def AdminStatistics(request):
    if not request.user.is_superuser:
        raise Http404('You are not admin')

    if request.method == 'POST':
        now = datetime.now().date()
        for place in ParkingPlace.objects.filter(isEmpty__exact=False):
            car = place.auto
            owners = car.users.all() #Client.objects.filter(cars__contains=car)
            check = Check()
            check.place = place
            check.save()

            for owner in owners:
                lastCheck = owner.check_set.filter(place=place).last()
                if lastCheck and lastCheck.dateOfActual.year == now.year and lastCheck.dateOfActual.month == now.month:
                    continue
                owner.check_set.add(check)
                owner.balance -= place.price
                owner.save()
    
    months = []
    profits = []

    for m in range(1, 13):
        months.append(m)
        checks_of_month = Check.objects.filter(dateOfActual__month=m)
        sum = 0
        for check in checks_of_month:
            sum += check.place.price
        profits.append(sum)

    data = Bar(x=months, y=profits)
    layoyt = Layout(title='Parking profit',
                    xaxis=dict(title='Months'),
                    yaxis=dict(title='profits'))
    fig = Figure(data=data, layout=layoyt)

    return render(
        request,
        'app/admin_statistic.html',
        context={'plot' : fig.to_html(full_html=False), }
        )


@login_required
def UpBalance(request):
    if request.method == "POST":
        form = BalanceForm(request.POST)
        if form.is_valid():
            client = request.user
            money = form.cleaned_data['money']
            cupon = form.cleaned_data['cupon']
            if(cupon):
                money = money + money * cupon

            client.balance += money
            client.save()
            logger.info(f'User {client.username} topped up his balance by {money}')
            return HttpResponseRedirect(reverse('user'))
    else:
        form = BalanceForm()

    return render(
            request,
            'app/up_balance.html',
            context={'form' : form })