from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer

class ProductsView(viewsets.ModelViewSet):
    model = Product
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    def list(self, request, *args, **kwargs):
        quaryset = self.get_queryset().filter(stock_quantity__gt=0)
        serializer = self.get_serializer(quaryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object() 
        product = self.get_serializer(instance)
        instance_category = Category.objects.all()
        category = CategorySerializer(instance_category, many=True)
        return Response({'product': product.data, 'categorys': category.data})
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)