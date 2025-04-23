from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'promocion', 'price_promotion', 'stock_quantity', 'created_at', 'updated_at') # Define quais campos do modelo serão exibidos na lista de objetos na interface administrativa do Django.
    search_fields = ('name',) # Especifica quais campos podem ser usados para buscar registros na interface administrativa.
    ordering = ('-created_at',) # Define a ordem padrão em que os objetos serão exibidos na lista.
    list_editable = ('name', 'price', 'promocion', 'price_promotion', 'stock_quantity') # Permite que você edite certos campos diretamente na lista de objetos.
    
admin.site.register(Product, ProductAdmin) # Registra o modelo Product e a classe ProductAdmin no site administrativo do Django.