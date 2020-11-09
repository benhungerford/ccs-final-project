from rest_auth.models import TokenModel
from rest_framework import serializers

from .models import Event




class EventSerializer(serializers.ModelSerializer):

    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        # depth = 1
        model = Event
        # fields = ('id', 'user', 'first', 'last', 'image', 'address', 'city', 'state', 'zipcode', 'phone', 'email', 'contacts', 'date', 'time', 'items',)
        fields = '__all__'
