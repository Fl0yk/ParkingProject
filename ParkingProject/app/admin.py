from django.contrib import admin
from django.conf import settings
from .models import ParkingPlace, Check, Auto, Vacancy, Employee, News, Coupon, User


admin.site.empty_value_display = '???'

admin.site.register(Check)
admin.site.register(Vacancy)
admin.site.register(Employee)
admin.site.register(News)
admin.site.register(Coupon)


@admin.register(Auto)
class AutoAdmin(admin.ModelAdmin):
    list_display = ['pk', 'brand', 'model', 'display_users']
    search_fields = ['^brand', '^model']
    #filter_horizontal = ['users']
    
    


@admin.register(ParkingPlace)
class ParkingPlaceAdmin(admin.ModelAdmin):
    list_display = ['pk', 'price', 'isEmpty', 'auto']
    list_filter = ['price']
    list_per_page = 10
    
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'number', 'balance']
    list_filter = ['username']
    list_editable = ['balance', ]
    filter_horizontal = ['cars']
    readonly_fields = ['password', 'last_login', 'date_joined']
    fieldsets = (
        (None, {
                'fields':('username', 'password')
                }), 
        ('Personal information', {
            'fields': ('first_name', 'last_name', 'email', 'balance', 'is_superuser')
        }),
        ('Others', {
            'fields': ('cars', )
        })
    )