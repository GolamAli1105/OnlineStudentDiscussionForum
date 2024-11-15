from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer,PostSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Post
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class PostListCreate(generics.ListCreateAPIView):
    serializer_class= PostSerializer
    permission_classes= [IsAuthenticated]
    queryset= Post.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class PostDelete(generics.DestroyAPIView):
    serializer_class= PostSerializer
    permission_classes= [IsAuthenticated]

    def get_queryset(self):
        user= self.request.user
        return Post.objects.filter(author=user)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PostVoteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        action = request.data.get('action')
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user

        if action == "upvote":
            if user in post.upvoted_by.all():
                post.upvoted_by.remove(user)
                post.upvotes -= 1
            elif user in post.downvoted_by.all():
                post.downvoted_by.remove(user)
                post.downvotes -= 1
                post.upvoted_by.add(user)
                post.upvotes += 1
            else:
                post.upvoted_by.add(user)
                post.upvotes += 1
        
        elif action == "downvote":
            if user in post.downvoted_by.all():
                post.downvoted_by.remove(user)
                post.downvotes -= 1
            elif user in post.upvoted_by.all():
                post.upvoted_by.remove(user)
                post.upvotes -= 1
                post.downvoted_by.add(user)
                post.downvotes += 1
            else:
                post.downvoted_by.add(user)
                post.downvotes += 1
        
        post.save()
        return Response({
            "upvotes": post.upvotes,
            "downvotes": post.downvotes
        }, status=status.HTTP_200_OK)