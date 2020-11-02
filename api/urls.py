from django.urls import include, path

urlpatterns = [
    # path('', include('accounts.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # path('articles/', include('articles.urls')),
]
