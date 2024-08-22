from django.urls import path
from . import views;

urlpatterns = [
    path('', views.get_tasks),
    path('add', views.add_task, {})
]
