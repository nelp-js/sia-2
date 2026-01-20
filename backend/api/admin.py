from django.contrib import admin
from .models import User, Event  # <--- Don't forget to import Event!

# 1. Register User
admin.site.register(User)

# # 2. Register Note
# admin.site.register(Note)

# 3. Register Event with special features
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'organizer', 'start_date', 'is_approved')
    list_filter = ('is_approved', 'start_date')
    actions = ['approve_events']

    # This creates a button to "Approve" multiple events at once
    def approve_events(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, "Selected events have been approved.")
    
    approve_events.short_description = "Mark selected events as Approved"