from django.urls import include, path
from django.conf.urls import url
from .views import EventListCreateView, EventRetrieveUpdateDestroyView, host_sms


urlpatterns = [
    path('events/', EventListCreateView.as_view()),
    path('events/<int:pk>/', EventRetrieveUpdateDestroyView.as_view()),
    path('submit/', host_sms),
    # url(r'submit/', AlertHost, name="default"),
]
