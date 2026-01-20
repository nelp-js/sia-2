from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Event
from .serializers import UserSerializer, EventSerializer  # <--- Now this import works!

# --- USER VIEWS ---
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# --- EVENT VIEWS ---
class EventListCreate(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Logic: Admins see ALL events.
        if user.is_staff:
            return Event.objects.all()
        # Regular users see Approved events + their own drafts
        return Event.objects.filter(is_approved=True) | Event.objects.filter(organizer=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            # Automatically set the organizer to the current logged-in user
            serializer.save(organizer=self.request.user)
        else:
            print(serializer.errors)

class EventDelete(generics.DestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only delete their OWN events
        return Event.objects.filter(organizer=self.request.user)