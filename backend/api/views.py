from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Event, ActivityLog
from .serializers import (
    UserSerializer, CurrentUserSerializer, UserListSerializer, UserUpdateSerializer,
    EventSerializer, EventUpdateSerializer, CustomTokenObtainPairSerializer, ActivityLogSerializer
)

# --- USER VIEWS ---
class CustomTokenObtainPairView(TokenObtainPairView):
    """Login view that issues JWT with is_superuser claim."""
    serializer_class = CustomTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):
    """Return current user id, username, is_superuser for frontend (e.g. dashboard link)."""
    serializer = CurrentUserSerializer(request.user)
    return Response(serializer.data)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)


class UserListView(generics.ListAPIView):
    """List all registered users (admin only). Excludes superusers from list."""
    serializer_class = UserListSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(is_superuser=False).order_by("-date_joined")


class UserDetailView(generics.RetrieveUpdateAPIView):
    """GET or PATCH a user by id (admin only). Used for edit form."""
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminUser])
def approve_user(request, user_id):
    """Set user is_approved=True and is_active=True so they can log in (admin only)."""
    try:
        user = User.objects.get(pk=user_id, is_superuser=False)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=404)
    
    user.is_approved = True
    user.is_active = True
    user.save()

    # --- NEW: LOG ACTIVITY ---
    ActivityLog.objects.create(
        action=f"User approved: {user.username}",
        module="User Management",
        user=request.user,
        status="Completed"
    )
    # -------------------------

    return Response({"detail": "User approved.", "is_approved": True, "is_active": True})


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminUser])
def reject_user(request, user_id):
    """Set user is_approved=False and is_active=False (admin only)."""
    try:
        user = User.objects.get(pk=user_id, is_superuser=False)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=404)
    
    user.is_approved = False
    user.is_active = False
    user.save()

    # --- NEW: LOG ACTIVITY ---
    ActivityLog.objects.create(
        action=f"User rejected: {user.username}",
        module="User Management",
        user=request.user,
        status="Rejected"
    )
    # -------------------------

    return Response({"detail": "User rejected.", "is_approved": False, "is_active": False})


# --- EVENT VIEWS ---
class EventListCreate(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Event.objects.filter(is_approved=True)
        if user.is_staff:
            return Event.objects.all()
        return Event.objects.filter(is_approved=True) | Event.objects.filter(organizer=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(organizer=self.request.user)
        else:
            print(serializer.errors)


class EventDetailView(generics.RetrieveUpdateAPIView):
    """GET or PATCH an event by id (admin only). Used for event management edit."""
    serializer_class = EventUpdateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Event.objects.all()


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminUser])
def approve_event(request, event_id):
    """Set event is_approved=True (admin only)."""
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response({"detail": "Event not found."}, status=404)
    event.is_approved = True
    event.save()
    ActivityLog.objects.create(
        action=f"Event approved: {event.event_name}",
        module="Event Management",
        user=request.user,
        status="Completed"
    )
    return Response({"detail": "Event approved.", "is_approved": True})


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminUser])
def reject_event(request, event_id):
    """Set event is_approved=False (admin only)."""
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response({"detail": "Event not found."}, status=404)
    event.is_approved = False
    event.save()
    ActivityLog.objects.create(
        action=f"Event rejected: {event.event_name}",
        module="Event Management",
        user=request.user,
        status="Rejected"
    )
    return Response({"detail": "Event rejected.", "is_approved": False})


class EventDelete(generics.DestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Event.objects.all()
        return Event.objects.filter(organizer=self.request.user)


class ActivityLogListView(generics.ListAPIView):
    queryset = ActivityLog.objects.all()[:10]
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated]