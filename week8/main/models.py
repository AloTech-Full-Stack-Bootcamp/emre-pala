from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.files import ImageField

class Post(models.Model):
  image = models.ImageField(upload_to = "uploads")
  content = models.TextField(max_length=100)
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)

  @property
  def likes_count(self):
    return self.like_set.count()

  @property
  def comments_count(self):
    return self.comment_set.count()

  def __str__(self):
    return f"{self.content} posted by {self.author}" 


class Like(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.post.content} liked by {self.user}"


class Comment(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  content = models.TextField(max_length=100)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"{self.content} commented by {self.user}"