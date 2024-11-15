from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    upvoted_by = models.ManyToManyField(User, related_name="upvoted_posts", blank=True)
    downvoted_by = models.ManyToManyField(User, related_name="downvoted_posts", blank=True)

    def __str__(self):
        return self.title