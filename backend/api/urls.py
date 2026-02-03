from django.urls import path
from . import views

urlpatterns = [
    path("user/me/", views.current_user, name="current-user"),
    path("users/", views.UserListView.as_view(), name="user-list"),
    path("users/<int:user_id>/approve/", views.approve_user, name="approve-user"),
    path("users/<int:user_id>/reject/", views.reject_user, name="reject-user"),
    path("events/", views.EventListCreate.as_view(), name="event-list"),
    path("events/delete/<int:pk>/", views.EventDelete.as_view(), name="delete-event"),
]