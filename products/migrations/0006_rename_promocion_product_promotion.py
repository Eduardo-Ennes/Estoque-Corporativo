# Generated by Django 5.2 on 2025-04-25 01:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_category_product_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='promocion',
            new_name='promotion',
        ),
    ]
