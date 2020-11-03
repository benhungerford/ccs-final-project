from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from phone_field import PhoneField
from localflavor.us.models import USZipCodeField, USStateField



class User(AbstractUser):
    pass


class Profile(models.Model):
    US_STATES = (('DEF', ''), ('AL', 'Alabama'), ('AK', 'Alaska'), ('AZ', 'Arizona'), ('AR', 'Arkansas'), ('CA', 'California'), ('CO', 'Colorado'), ('CT', 'Connecticut'), ('DE', 'Delaware'), ('DC', 'District of Columbia'), ('FL', 'Florida'), ('GA', 'Georgia'), ('HI', 'Hawaii'), ('ID', 'Idaho'), ('IL', 'Illinois'), ('IN', 'Indiana'), ('IA', 'Iowa'), ('KS', 'Kansas'), ('KY', 'Kentucky'), ('LA', 'Louisiana'), ('ME', 'Maine'), ('MD', 'Maryland'), ('MA', 'Massachusetts'), ('MI', 'Michigan'), ('MN', 'Minnesota'), ('MS', 'Mississippi'), ('MO', 'Missouri'), ('MT', 'Montana'), ('NE', 'Nebraska'), ('NV', 'Nevada'), ('NH', 'New Hampshire'), ('NJ', 'New Jersey'), ('NM', 'New Mexico'), ('NY', 'New York'), ('NC', 'North Carolina'), ('ND', 'North Dakota'), ('OH', 'Ohio'), ('OK', 'Oklahoma'), ('OR', 'Oregon'), ('PA', 'Pennsylvania'), ('RI', 'Rhode Island'), ('SC', 'South Carolina'), ('SD', 'South Dakota'), ('TN', 'Tennessee'), ('TX', 'Texas'), ('UT', 'Utah'), ('VT', 'Vermont'), ('VA', 'Virginia'), ('WA', 'Washington'), ('WV', 'West Virginia'), ('WI', 'Wisconsin'), ('WY', 'Wyoming'))

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first = models.CharField(max_length=255)
    last = models.CharField(max_length=255)
    image = models.ImageField(upload_to="profiles/", blank=True, null=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = USStateField(
        max_length=255,
        choices=US_STATES,
        default='DEF',
    )
    zipcode = USZipCodeField()
    phone = PhoneField(blank=True, help_text='Contact phone number', E164_only=False)
    email = models.EmailField(max_length=254, blank=True, null=True)



    def __str__(self):
        return self.user.username
