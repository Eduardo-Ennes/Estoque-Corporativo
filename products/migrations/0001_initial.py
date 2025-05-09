# Generated by Django 5.2 on 2025-04-23 02:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=75)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('promocion', models.BooleanField(default=False)),
                ('price_promotion', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('stock_quantity', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
