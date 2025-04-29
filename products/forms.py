from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'promotion', 'price_promotion', 'stock_quantity', 'category']
        '''
            fields = Seleciona os campos do model que vc usará no formulário.
        '''
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Nome do Produto'}),
            'price': forms.NumberInput(attrs={'placeholder': 'Preço'}),
            'promotion': forms.CheckboxInput(),
            'price_promotion': forms.NumberInput(attrs={'placeholder': 'Preço Promoção'}),
            'stock_quantity': forms.NumberInput(attrs={'placeholder': 'Quantidade'}),
            'category': forms.Select(),
        }
        '''
            serve para customizar os campos do formulário que o Django gera automaticamente a partir do modelo. Especificamente, você está dizendo ao Django qual tipo de input HTML usar e quais atributos HTML cada campo deve ter.
        '''
