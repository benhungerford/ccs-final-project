# Generated by Django 3.1.3 on 2020-11-06 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0008_auto_20201106_2050'),
    ]

    operations = [
        migrations.AddField(
            model_name='form',
            name='guests',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='form',
            name='items',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
