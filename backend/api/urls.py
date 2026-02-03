from django.urls import path
from . import views

urlpatterns = [
    path("user/me/", views.current_user, name="current-user"),
    path("events/", views.EventListCreate.as_view(), name="event-list"),
    path("events/delete/<int:pk>/", views.EventDelete.as_view(), name="delete-event"),
]