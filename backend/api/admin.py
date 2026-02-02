from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Event

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # This controls what you see in the main list
    list_display = ('username', 'email', 'first_name', 'last_name', 'batch', 'program', 'is_staff')
    
    # This adds filters on the right sidebar
    list_filter = ('batch', 'program', 'is_staff', 'is_superuser')
    
    # This controls the "Edit User" page structure
    fieldsets = UserAdmin.fieldsets + (
        ('Alumni Info', {'fields': ('batch', 'program', 'phone_number', 'valid_id')}),
        ('Marriage Info', {'fields': ('is_married', 'maiden_name')}),
    )
    
    # This allows you to search users by these fields
    search_fields = ('username', 'first_name', 'last_name', 'email', 'batch')

# --- 2. Event Admin (Your existing code) ---
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    # 1. VISIBLE COLUMNS: 'organizer' shows the username here
    list_display = ('event_name', 'organizer', 'start_date', 'is_approved')
    
    # 2. FILTER SIDEBAR: Adds a sidebar to filter "By Organizer"
    list_filter = ('is_approved', 'start_date', 'organizer') 
    
    # 3. SEARCH BAR: Allows you to type a username or email to find their events
    # Note: 'organizer__username' means "Search the username field OF the organizer"
    search_fields = ('event_name', 'organizer__username', 'organizer__email')

    actions = ['approve_events']

    def approve_events(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, "Selected events have been approved.")
    
    approve_events.short_description = "Event Approved"