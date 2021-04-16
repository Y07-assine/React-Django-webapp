from .views import NewsListView,YoutubeIDView ,QuoteView ,AlbumView
from django.urls import path

urlpatterns = [
    path('news/',NewsListView.as_view(),name='news'),
    path('youtubeid',YoutubeIDView.as_view(),name='youtubeid'),
    path('quote',QuoteView.as_view(),name='quote'),
    path('album',AlbumView.as_view(),name='album'),
]
