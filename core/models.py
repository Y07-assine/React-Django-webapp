from django.db import models

# Create your models here.

class Author(models.Model):
    fistname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.CharField(max_length=200)

    def __str__(self):
        return self.fistname

class News(models.Model):
    title = models.TextField(max_length=400)
    contenu = models.TextField()
    source = models.CharField(max_length=200,null=True)
    date = models.DateTimeField(auto_now_add=False)
    image = models.ImageField()
    slug = models.SlugField()
    author = models.ForeignKey(Author,on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    


class YoutubeId(models.Model):
    videoID= models.CharField(max_length=100)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
class Quote(models.Model):
    quote = models.TextField(max_length=300)
    author = models.CharField(max_length=100)
    author_status = models.CharField(max_length=100)

    def __str__(self):
        return self.quote
    
class Artist(models.Model):
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class Album(models.Model):
    name = models.CharField(max_length=100)
    spotifyID = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
