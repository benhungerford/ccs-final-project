from rest_framework import generics
from rest_framework import permissions
from .models import Event
from .serializers import EventSerializer

from django.conf import settings
from django.http import HttpResponse
from twilio.rest import Client

from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view


class EventListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class EventRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


# class AlertHost(generics.RetrieveUpdateDestroyAPIView):
@api_view(['POST'])
def host_sms(request):
    message_to_broadcast = ("One of your guests has signed up to bring something to the table!")
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    for recipient in settings.SMS_BROADCAST_TO_NUMBERS:
        if recipient:
            client.messages.create(to=recipient,
                                   from_=settings.TWILIO_PHONE_NUMBER,
                                   body=message_to_broadcast)

    return Response('Hey, you should hire me!')
