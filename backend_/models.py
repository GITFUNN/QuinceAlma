from django.db import models

# Create your models here.
class Invitation(models.Model):
    nombre_completo= models.CharField(max_length=255)
    asiste = models.BooleanField(default=False)
