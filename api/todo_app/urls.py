from django.urls import path
from . import views;

urlpatterns = [
    path('', views.get_tasks, {}),
    path('add', views.add_task, {}),
    path('mark', views.mark_task, {}),
    path('remove', views.remove_task, {}),
]
