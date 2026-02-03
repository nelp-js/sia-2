from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

class User(AbstractUser):
    # 1. DYNAMIC BATCHES: This automatically creates a list from 1948 to next year
    # This replaces the hardcoded list so you don't have to type 70 lines.
    BATCH_CHOICES = [(str(year), str(year)) for year in range(1948, datetime.date.today().year + 2)]
    
    # 2. MATCH FRONTEND: Adjusted to match your Register.jsx (CS, IT, IS)
    PROGRAM_CHOICES = [
        ('CS', 'Computer Science'),
        ('IT', 'Information Technology'),
        ('IS', 'Information Systems'),
    ]
    
    first_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150)
    is_married = models.BooleanField(default=False)
    maiden_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(unique=True)
    
    # 3. VERIFY THIS EXISTS: This looks correct for your file upload!
    valid_id = models.ImageField(upload_to='valid_ids/', blank=True, null=True)
    
    phone_number = models.CharField(max_length=15)
    
    # 4. UPDATED MAX_LENGTH: Changed to 4 to hold "2025" safely
    batch = models.CharField(max_length=4, choices=BATCH_CHOICES)
    program = models.CharField(max_length=2, choices=PROGRAM_CHOICES)
    
    def __str__(self):
        return self.username

class Event(models.Model):
    # Existing fields
    event_name = models.CharField(max_length=200)
    event_description = models.TextField()
    start_date = models.DateField()
    start_time = models.TimeField()
    venue = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default="General") # Added default
    is_approved = models.BooleanField(default=False)
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')

    # --- NEW FIELDS TO MATCH FRONTEND ---
    end_date = models.DateField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    event_image = models.ImageField(upload_to='event_images/', null=True, blank=True)
    cost = models.CharField(max_length=100, null=True, blank=True) # e.g. "3000 pesos"
    
    # For the manual organizer names (Thor Hanson, etc.)
    organizer_names = models.CharField(max_length=500, null=True, blank=True)
    
    # Action Button Logic
    action_button_label = models.CharField(max_length=100, null=True, blank=True)
    action_button_link = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.event_name