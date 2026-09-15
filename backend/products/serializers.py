from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model  = Product
        fields = [
            'id', 'title', 'brand', 'price', 'category', 'imageUrl', 'rating',
            'is_prime',
            # ← new: the three columns the details page needs. They were in the
            # model all along; until they were listed here they never left the
            # server.
            'description', 'availability', 'total_reviews',
        ]
        read_only_fields = ['seller']   # ← clients can’t send this


