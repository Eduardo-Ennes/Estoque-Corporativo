from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=75)
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    '''
        max_digits=10 => 10 dígitos no total
        decimal_places=2 => 2 dígitos após a vírgula
        ex: 12345678.90
    '''
    promocion = models.BooleanField(default=False)
    '''
        default=False => por padrão o valor é False
        default => define um valor padrão a ser salvo no banco de dados caso o usuário não preencha o campo
    '''
    price_promotion = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) 
    '''
        default=0.00 => por padrão o valor é 0.00
    '''
    stock_quantity = models.IntegerField(default=0)
    '''
        IntergerField => número inteiro
    '''
    created_at = models.DateTimeField(auto_now_add=True)
    '''
        auto_now_add=True => o campo é preenchido automaticamente com a data e hora atual quando o objeto é criado
    '''
    updated_at = models.DateTimeField(auto_now=True)
    '''
        auto_now=True => o campo é atualizado automaticamente com a data e hora atual quando o objeto é atualizado
    '''
    
    def __str__(self):
        return self.name, self.price, self.promocion, self.price_promotion, self.stock_quantity, self.created_at, self.updated_at
    '''
        O método __str__ serve para determinar como o objeto será exibido de forma legível.
        Quando você cria um objeto do modelo, como um produto, o Django tenta mostrar esse objeto de maneira compreensível.
        Se você não definir um __str__, ele vai mostrar algo como "<Produto: Produto object (1)>", o que não é muito útil.
     
        Com o __str__, podemos garantir que ao exibir um produto no Django Admin ou no shell, por exemplo,
        ele mostre algo mais útil, como o nome do produto, facilitando a identificação.
        
        Exemplo:
        - Se o nome do produto for "Notebook", o Django vai mostrar isso diretamente ao invés de "<Produto: Produto object (1)>"
    '''   
            
