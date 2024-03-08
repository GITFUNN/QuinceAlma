from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import InvitationSerializer, ThemeSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Invitation, Theme

# Create your views here.

@api_view(['POST'])
def create_invitation(request):
    serializer = InvitationSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_theme(request):
    serializer = ThemeSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_invitations(request):
    invitations = Invitation.objects.all()
    serializer = InvitationSerializer(invitations,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_theme(request):
    theme = Theme.objects.all()
    serializer = ThemeSerializer(theme, many=True)
    return Response(serializer.data)
