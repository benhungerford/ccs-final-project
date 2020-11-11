from django.urls import include, path
from .views import EventListCreateView, EventRetrieveUpdateView

urlpatterns = [
    path('events/', EventListCreateView.as_view()),
    path('events/<int:pk>/', EventRetrieveUpdateView.as_view()),
    # path('events/<int:pk>/', EventRetrieveUpdateDestroyView.as_view()),
]
