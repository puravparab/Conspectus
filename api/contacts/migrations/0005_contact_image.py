# Generated by Django 4.2.1 on 2023-06-04 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0004_contact_job'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='image',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]
