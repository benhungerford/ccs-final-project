# Generated by Django 3.1.3 on 2020-11-09 18:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import localflavor.us.models
import phone_field.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first', models.CharField(max_length=255)),
                ('last', models.CharField(max_length=255)),
                ('image', models.ImageField(blank=True, null=True, upload_to='profiles/')),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('state', localflavor.us.models.USStateField(default='DEF', max_length=2)),
                ('zipcode', localflavor.us.models.USZipCodeField(max_length=10)),
                ('phone', phone_field.models.PhoneField(blank=True, help_text='Contact phone number', max_length=31)),
                ('email', models.EmailField(blank=True, max_length=255, null=True)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('items', models.JSONField(blank=True, null=True)),
                ('details', models.TextField(blank=True)),
                ('guests', models.JSONField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
