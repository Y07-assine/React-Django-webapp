from rest_framework import serializers
from core.models import News,YoutubeId,Quote,Album,Artist

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = (
            'title',
            'contenu',
            'source',
            'date',
            'image',
            'slug',
            'author'
        )

class YoutubeIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = YoutubeId
        fields = (
            'videoID',
            'title'
        )

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = (
            'quote',
            'author',
            'author_status'

        )

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = (
            'name',
            'spotifyID',
            'artist'
        )

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = (
        'name',
        'status',
        'spotifyID'
        )

