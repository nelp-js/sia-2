from django.urls import path
from . import views
from .views import ActivityLogListView


urlpatterns = [
    path("user/me/", views.current_user, name="current-user"),
    path("users/", views.UserListView.as_view(), name="user-list"),
    path("users/<int:pk>/", views.UserDetailView.as_view(), name="user-detail"),
    path("users/<int:user_id>/approve/", views.approve_user, name="approve-user"),
    path("users/<int:user_id>/reject/", views.reject_user, name="reject-user"),
    path("events/", views.EventListCreate.as_view(), name="event-list"),
    path("events/<int:pk>/", views.EventDetailView.as_view(), name="event-detail"),
    path("events/<int:event_id>/approve/", views.approve_event, name="approve-event"),
    path("events/<int:event_id>/reject/", views.reject_event, name="reject-event"),
    path("events/delete/<int:pk>/", views.EventDelete.as_view(), name="delete-event"),
    path('activities/', ActivityLogListView.as_view(), name='activity-list'),
]