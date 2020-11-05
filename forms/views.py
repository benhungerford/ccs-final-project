from rest_framework import generics
from rest_framework import permissions
from .models import Form
from .serializers import ProfileSerializer
from django.shortcuts import get_object_or_404




class FormListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Form.objects.all()
    serializer_class = FormSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)


class FormRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Form.objects.all()
    serializer_class = FormSerializer

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)