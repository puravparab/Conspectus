# Generated by Django 4.2.1 on 2023-06-04 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0002_alter_organization_location_city_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='image',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]
