from django.urls import include, path
from .views import ProfileListCreateView, ProfileRetrieveUpdateView

urlpatterns = [
    path('profiles/', ProfileListCreateView.as_view()),
    path('profiles/detail/', ProfileRetrieveUpdateView.as_view()),
]
