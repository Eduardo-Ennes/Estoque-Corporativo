from django import forms
from django.core.exceptions import ValidationError
from decimal import Decimal
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'promocion', 'price_promotion', 'stock_quantity', 'category']
        '''
            fields = Seleciona os campos do model que vc usará no formulário.
        '''
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Nome do Produto'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Preço'}),
            'promocion': forms.CheckboxInput(),
            'price_promotion': forms.NumberInput(attrs={'placeholder': 'Preço Promoção'}),
            'stock_quantity': forms.NumberInput(attrs={'placeholder': 'Quantidade'}),
            'category': forms.Select(),
        }
        '''
            serve para customizar os campos do formulário que o Django gera automaticamente a partir do modelo. Especificamente, você está dizendo ao Django qual tipo de input HTML usar e quais atributos HTML cada campo deve ter.
        '''

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name) == 0:
            raise ValidationError('O nome do produto não pode ser vazio.')
        
        if len(name) > 75:
            raise ValidationError('O nome do produto teve ter no máximo 75 caracteres.')
        
        return name
        
    def clean(self):
        cleaned_data = super().clean()
        price = cleaned_data.get('price')
        price_promotion = cleaned_data.get('price_promotion')
        promocion = cleaned_data.get('promocion')
        
        if price is None:
            raise ValidationError('O preço não pode ser vazio.')
        
        if price < 0:
            raise ValidationError('O valor do preço deve ser maior que 0.')
        
        if price >= Decimal('100000000.00'):
            raise ValidationError("Preço deve ser menor que 100000000.00")
        
        if promocion == True:
            if price_promotion is None:
                raise ValidationError('O preço promocional não pode ser vazio.')
            
            if price_promotion < 0:
                raise ValidationError('O valor do preço promocional deve ser maior que 0.')
            
            if price_promotion >= price:
                self.add_error('price_promotion', 'o preço promocional deve ser menor que o preço de mercado.')
                self.add_error('price', 'O preço de mercado deve ser maior que o preço promocional.')
                
            return cleaned_data
        return cleaned_data
    
    def clean_stock_quantity(self):
        stock_quantity = self.cleaned_data.get('stock_quantity')
        
        if stock_quantity is None:
            raise ValidationError('A quantidade não pode ser vazia.')
        
        if stock_quantity < 0:
            raise ValidationError('A quantidade deve ser maior ou igaul a 0.')
        
        return stock_quantity
    
    def clean_category(self):
        category = self.cleaned_data.get('category')
        
        if category is None:
            raise ValidationError('A categoria não pode ser vazia.')
        
        if category == '' or category == ' ':
            raise ValidationError('A categoria não pode ser vazia.')
        
        return category