# Generated by Django 4.1.7 on 2023-03-14 18:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0004_alter_question_jobid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='examcandidates',
            old_name='jobId',
            new_name='job',
        ),
        migrations.RenameField(
            model_name='examcandidates',
            old_name='userId',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='examresult',
            old_name='jobId',
            new_name='job',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='jobId',
            new_name='job',
        ),
    ]
