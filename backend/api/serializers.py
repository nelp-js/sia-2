from rest_framework import serializers
from .models import User, Note


class UserSerializer(serializers.ModelSerializer):
    confirm_email = serializers.EmailField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            "id", "first_name", "middle_name", "last_name", 
            "is_married", "maiden_name", "email", "confirm_email",
            # "valid_id",# 
            "phone_number", "batch", "program",
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
            #"valid_id": {"required": True},
            "maiden_name": {"required": False},
        }

    def validate(self, data):
        # Check if emails match
        if data.get('email') != data.get('confirm_email'):
            raise serializers.ValidationError({
                "confirm_email": "Email addresses do not match."
            })
        
        # Password validation - minimum 8 characters
        password = data.get('password', '')
        if len(password) < 8:
            raise serializers.ValidationError({
                "password": "Password must be at least 8 characters long."
            })
            
        # If not married, clear maiden name (set to empty)
        if not data.get('is_married', False):
            data['maiden_name'] = None
        
        return data

    def create(self, validated_data):
        # Remove confirm_email as it's not part of the model
        validated_data.pop('confirm_email', None)
        
        # Extract password to hash it properly
        password = validated_data.pop('password')
        
        # Create user instance
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}