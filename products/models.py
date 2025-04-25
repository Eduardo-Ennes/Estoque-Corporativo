from django.db import models

class Product(models.Model):
    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'
        
    name = models.CharField(max_length=75, verbose_name='Nome do Produto')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Preço') 
    '''
        max_digits=10 => 10 dígitos no total
        decimal_places=2 => 2 dígitos após a vírgula
        ex: 12345678.90
    '''
    promotion = models.BooleanField(default=False, verbose_name='Promoção')
    '''
        default=False => por padrão o valor é False
        default => define um valor padrão a ser salvo no banco de dados caso o usuário não preencha o campo
    '''
    price_promotion = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name='Preço Promoção') 
    '''
        default=0.00 => por padrão o valor é 0.00
    '''
    stock_quantity = models.IntegerField(default=0, verbose_name='Quantidade')
    '''
        IntergerField => número inteiro
    '''
    category = models.ForeignKey('Category', on_delete=models.CASCADE, verbose_name='Categoria', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    '''
        auto_now_add=True => o campo é preenchido automaticamente com a data e hora atual quando o objeto é criado
    '''
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    '''
        auto_now=True => o campo é atualizado automaticamente com a data e hora atual quando o objeto é atualizado
    '''
    
    def __str__(self):
        return f'{self.name}  R${self.price}  {self.promotion}  {self.price_promotion} {self.stock_quantity} {self.category} {self.created_at}  {self.updated_at}'
    '''
        O método __str__ serve para determinar como o objeto será exibido de forma legível.
        Quando você cria um objeto do modelo, como um produto, o Django tenta mostrar esse objeto de maneira compreensível.
        Se você não definir um __str__, ele vai mostrar algo como "<Produto: Produto object (1)>", o que não é muito útil.
     
        Com o __str__, podemos garantir que ao exibir um produto no Django Admin ou no shell, por exemplo,
        ele mostre algo mais útil, como o nome do produto, facilitando a identificação.
        
        Exemplo:
        - Se o nome do produto for "Notebook", o Django vai mostrar isso diretamente ao invés de "<Produto: Produto object (1)>"
    '''   
            

class Category(models.Model):
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        
    name = models.CharField(max_length=75, verbose_name='Nome da Categoria')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    def __str__(self):
        return self.name