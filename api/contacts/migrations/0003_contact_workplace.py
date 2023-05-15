# Generated by Django 4.2.1 on 2023-05-14 01:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0002_alter_organization_location_city_and_more'),
        ('contacts', '0002_alter_contact_current_location_city_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='workplace',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='organizations.organization'),
        ),
    ]