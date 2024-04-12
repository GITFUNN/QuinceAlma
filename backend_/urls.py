from django.urls import path
from . import views

urlpatterns = [
    path('post/', views.create_invitation),
    path('post2/', views.create_theme),
    path('get/', views.get_invitations),
    path('get2/', views.get_theme),


]
