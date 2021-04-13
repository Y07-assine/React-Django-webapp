from rest_framework.generics import ListAPIView
from core.models import News ,YoutubeId ,Quote
from .serializers import NewsSerializer,YoutubeIDSerializer , QuoteSerializer
from rest_framework.permissions import AllowAny
from django.db.models import F ,Q

class NewsListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = NewsSerializer
    queryset = News.objects.all().order_by(F('id').desc())[:5]


class YoutubeIDView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = YoutubeIDSerializer
    queryset = YoutubeId.objects.all().order_by(F('id').desc())[:4]

class QuoteView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = QuoteSerializer
    queryset = Quote.objects.all().order_by('?')[:1]