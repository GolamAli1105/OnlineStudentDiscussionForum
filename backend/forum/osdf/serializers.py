from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        field = ["id","title","content","created_at","author","upvotes","downvotes","upvoted_by_user","downvoted_by_user"]
        extra_kwargs = {"author":{"read_only": True}}

    def get_upvoted_by_user(self, obj):
        user = self.context['request'].user
        return user in obj.upvoted_by.all()

    def get_downvoted_by_user(self, obj):
        user = self.context['request'].user
        return user in obj.downvoted_by.all()
    