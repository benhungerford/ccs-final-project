# Generated by Django 3.1.3 on 2020-11-05 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0002_auto_20201104_1912'),
    ]

    operations = [
        migrations.AddField(
            model_name='form',
            name='details',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='form',
            name='email',
            field=models.EmailField(blank=True, max_length=255, null=True),
        ),
    ]