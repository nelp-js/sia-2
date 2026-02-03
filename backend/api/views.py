from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Event
from .serializers import UserSerializer, CurrentUserSerializer, UserListSerializer, EventSerializer, CustomTokenObtainPairSerializer

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
    return Response({"detail": "User rejected.", "is_approved": False, "is_active": False})


# --- EVENT VIEWS ---
class EventListCreate(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    
    # 2. CHANGE PERMISSION: Guests can Read (Get), Users can Write (Post)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user = self.request.user

        # 3. HANDLE GUESTS (Anonymous Users)
        # If we don't check this, the code crashes when trying to check "user.is_staff" or "organizer=user"
        if user.is_anonymous:
            return Event.objects.filter(is_approved=True)

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