from rest_framework import serializers
from decimal import Decimal
from .models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), 
        write_only=True,
        source='category'
    )
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'promotion', 'price_promotion', 'stock_quantity', 'category', 'category_id']
        
    def validate_name(self, name):
        if name is not None: 
            if name == '' or name == ' ':
                raise serializers.ValidationError("O nome do produto não pode ser vazio.")
            
            if Product.objects.filter(name=name).exists():
                raise serializers.ValidationError("Já existe um produto com este nome.")
            
            if len(name) > 75:
                raise serializers.ValidationError("O nome do produto não pode ter mais de 75 caracteres.")
            
        return name 
    
    def validate_stock_quantity(self, stock_quantity):
        if stock_quantity is not None:      
            if not isinstance(stock_quantity, int):
                raise serializers.ValidationError("A quantidade em estoque deve ser um número inteiro.")
            
            if stock_quantity < 0:
                raise serializers.ValidationError("A quantidade em estoque não pode ser menor que zero.")
        
        return stock_quantity
    
    def validate(self, data):
        promotion = data.get('promotion')
        price = data.get('price')
        price_promotion = data.get('price_promotion')
    
        if price is not None: 
            if price <= 0:
                raise serializers.ValidationError("O valor do produto deve maior que R$0.00.")
            
            if price >= Decimal('100000000.00'):
                raise serializers.ValidationError("Preço deve ser menor que 100000000.00.")
            
        if promotion:
            if price_promotion is not None:
                if price_promotion <= 0:
                    raise serializers.ValidationError("O valor do preço promocional deve ser maior que 0.")
                
                if price_promotion >= price:
                    raise serializers.ValidationError("O preço promocional deve ser menor que o preço de mercado.")
        else: 
            if price_promotion is not None:
                if price_promotion < 0:
                    raise serializers.ValidationError("O valor do preço promocional não pode ser menor que 0.")
                
        return data
    