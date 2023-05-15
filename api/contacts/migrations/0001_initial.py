# Generated by Django 4.2.1 on 2023-05-13 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=20, null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('current_location_city', models.CharField(max_length=255, null=True)),
                ('current_location_country', models.CharField(max_length=255, null=True)),
                ('importance', models.CharField(max_length=255, null=True)),
                ('relationship', models.CharField(max_length=255, null=True)),
                ('day_met', models.DateField(null=True)),
                ('original_location_city', models.CharField(max_length=255, null=True)),
                ('original_location_country', models.CharField(max_length=255, null=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]