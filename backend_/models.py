from django.db import models

# Create your models here.
class Invitation(models.Model):
    name= models.CharField(max_length=255)
    assist = models.BooleanField(default=False)
    comments = models.TextField(blank=True, max_length=510)
class Theme(models.Model):
    name = models.CharField(max_length=255)
    song = models.CharField(max_length=255)
