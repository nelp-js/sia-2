from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    BATCH_CHOICES = [
        ('2020', '2020'),
        ('2021', '2021'),
        ('2022', '2022'),
        ('2023', '2023'),
        ('2024', '2024'),
        ('2025', '2025'),
    ]
    
    PROGRAM_CHOICES = [
        ('CS', 'Computer Science'),
        ('IT', 'Information Technology'),
        ('IS', 'Information Systems'),
        ('CE', 'Computer Engineering'),
    ]
    
    first_name = models.CharField(max_length=150)
    middle_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_married = models.BooleanField(default=False)
    maiden_name = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField(unique=True)
    #valid_id = models.FileField(upload_to='valid_ids/')
    phone_number = models.CharField(max_length=15)
    batch = models.CharField(max_length=4, choices=BATCH_CHOICES)
    program = models.CharField(max_length=2, choices=PROGRAM_CHOICES)
    
    def __str__(self):
        return self.username


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title