from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Product, Category
from .serializer import ProductSerializer

class ProductsView(viewsets.ModelViewSet):
    model = Product
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    '''
        def list(self, request, *args, **kwargs):
            queryset = self.get_queryset().filter(quantidade__gt=0)  # gt = greater than

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

    '''
    
    def list(self, request, *args, **kwargs):
        print('Conexão realizada com sucesso!')
        quaryset = self.get_queryset().filter(stock_quantity__gt=0)
        serializer = self.get_serializer(quaryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)