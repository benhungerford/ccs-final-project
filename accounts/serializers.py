from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_auth.models import TokenModel
from .models import Profile


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Profile
        fields = ('id', 'user', 'first', 'last', 'image', 'address', 'city', 'state', 'zipcode', 'phone', 'email',)


class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = TokenModel
        fields = ('key', 'user',)
