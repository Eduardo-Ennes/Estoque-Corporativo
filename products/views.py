from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer
import products.operation_card as operation_card
import products.operation_lower_card as operation_lower_card

class ProductsView(viewsets.ModelViewSet):
    model = Product
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().order_by('-pk')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object() 
        product = self.get_serializer(instance)
        instance_category = Category.objects.all()
        category = CategorySerializer(instance_category, many=True)
        return Response({'product': product.data, 'categorys': category.data})
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Produto criado com sucesso', 'status': status.HTTP_200_OK})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({'message': 'Atualizado com sucesso!', 'code': status.HTTP_200_OK})
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({'message': 'Atualizado com sucesso!', 'code': status.HTTP_200_OK})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Produto deletado com sucesso!"}, status=status.HTTP_200_OK)
    
    
class ReturnCategoriesForCreate(APIView):
    def get(self, request):
        instance = Category.objects.all()
        category = CategorySerializer(instance, many=True)
        return Response({'categories': category.data})

  
class ProductsCard(APIView):
    def put(self, request, pk, qtd):
        product = Product.objects.filter(pk=pk).first()
        serializer = ProductSerializer(product)
        card = operation_card.Card(pk, qtd, request.data[0], request.data[1], serializer)
        return Response(card, status=status.HTTP_200_OK)

class LowerProductCard(APIView):
    def put(self, request, pk):
        print('FUNÇÃO DE LOWER CARRINHO!')
        card = operation_lower_card.Card(pk, request.data[0], request.data[1])
        return Response(card, status=status.HTTP_200_OK)
    
class GetSearch(APIView):
    def get(self, request, pk, name):
        print('name: ', name)
        if pk > 0 and name:
            products = Product.objects.filter(
                category=pk,
                name__icontains=name
            )
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        if pk == 0 and name:
            products = Product.objects.filter(
                name__icontains=name
            )
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        