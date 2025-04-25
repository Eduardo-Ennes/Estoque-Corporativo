from rest_framework import serializers
from decimal import Decimal
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'promotion', 'price_promotion', 'stock_quantity', 'category']
        
    def validate_name(self, name):
        if name is None or name == '' or name == ' ':
            raise serializers.ValidationError("O nome do produto não pode ser vazio.")
        
        if len(name) > 75:
            raise serializers.ValidationError("O nome do produto não pode ter mais de 75 caracteres.")
        
        return name 
    
    def validate_stock_quantity(self, stock_quantity):
        if stock_quantity is None:
            raise serializers.ValidationError("A quantidade em estoque não pode ser vazia.")
        
        if not isinstance(stock_quantity, int):
            raise serializers.ValidationError("A quantidade em estoque deve ser um número inteiro.")
        
        if stock_quantity < 0:
            raise serializers.ValidationError("A quantidade em estoque não pode ser menor que zero.")
        
        return stock_quantity
    
    def validate(self, data):
        promotion = data.get('promotion')
        price = data.get('price')
        price_promotion = data.get('price_promotion')
        
        if price is None:
            raise serializers.ValidationError("O preço não pode ser vazio.")
    
        if price < 0:
            raise serializers.ValidationError("O valor do preço deve ser maior que 0.")
        
        if price >= Decimal('100000000.00'):
            raise serializers.ValidationError("Preço deve ser menor que 100000000.00.")
        
        if promotion:
            if price_promotion is None:
                raise serializers.ValidationError("O preço promocional não pode ser vazio.")
            
            if price_promotion < 0:
                raise serializers.ValidationError("O valor do preço promocional deve ser maior que 0.")
            
            if price_promotion >= price:
                raise serializers.ValidationError("O preço promocional deve ser menor que o preço de mercado.")
            
        return data
    