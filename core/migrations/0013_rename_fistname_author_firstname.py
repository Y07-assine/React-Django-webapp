# Generated by Django 3.2 on 2021-05-02 00:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_alter_artist_spotifyid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='author',
            old_name='fistname',
            new_name='firstname',
        ),
    ]
