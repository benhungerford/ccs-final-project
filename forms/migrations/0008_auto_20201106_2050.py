# Generated by Django 3.1.3 on 2020-11-06 20:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0007_form_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='form',
            name='contacts',
        ),
        migrations.RemoveField(
            model_name='form',
            name='items',
        ),
    ]