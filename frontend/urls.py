from django.urls import include, path
from . import views


app_name = 'frontend'


urlpatterns = [
    path('<path:resource>', views.IndexView.as_view()),
    path('', views.IndexView.as_view()),
]
