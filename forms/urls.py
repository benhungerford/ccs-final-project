from django.urls import include, path
from .views import FormListCreateView, FormRetrieveUpdateView

urlpatterns = [
    path('forms/', FormListCreateView.as_view()),
    path('forms/detail/', FormRetrieveUpdateView.as_view()),
]
