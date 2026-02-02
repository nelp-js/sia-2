from rest_framework import serializers
from .models import User, Event

class UserSerializer(serializers.ModelSerializer):
    confirm_email = serializers.EmailField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            "id", "first_name", "middle_name", "last_name", 
            "is_married", "maiden_name", "email", "confirm_email",
            "valid_id", "phone_number", "batch", "program",
            "username", "password"
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "first_name": {"required": True},
            "middle_name": {"required": True},
            "last_name": {"required": True},
            "email": {"required": True},
            "phone_number": {"required": True},
            "batch": {"required": True},
            "program": {"required": True},
            "maiden_name": {"required": False},
            "valid_id": {"required": True},
        }

    def validate(self, data):
        if data.get('email') != data.get('confirm_email'):
            raise serializers.ValidationError({"confirm_email": "Email addresses do not match."})
        
        password = data.get('password', '')
        if len(password) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})
            
        if not data.get('is_married', False):
            data['maiden_name'] = None
        
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_email', None)
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id", "event_name", "event_description", "start_date", "end_date",
            "start_time", "end_time", "venue", "category", "is_approved", 
            "organizer", "event_image", "cost", "organizer_names", 
            "action_button_label", "action_button_link"
        ]
        read_only_fields = ["is_approved", "organizer"]