from django.contrib import admin

# Register your models here.

from .models import Author,News,YoutubeId,Quote

admin.site.register(Author)
admin.site.register(News)
admin.site.register(YoutubeId)
admin.site.register(Quote)
