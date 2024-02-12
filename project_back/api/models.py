from django.db import models
from django.contrib.auth.models import User

class Student(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.TextField(max_length=20)
    email = models.CharField(max_length=100, default='')
    password = models.TextField(max_length=24)
    secret_word = models.TextField(max_length=20, default="")

    class Meta:
        verbose_name = 'Student'

    def to_json(self):
        return {
            'id' : self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email' : self.email,
            'password' : self.password,
            'secret_word' : self.secret_word
        }



class Task(models.Model):
    title = models.CharField(max_length=50)
    subject = models.CharField(max_length=30)
    date = models.CharField(max_length=30)
    description = models.CharField(max_length=10000)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Task'
    
    def to_json(self):
        return{
            'id':self.id,
            'title' : self.title,
            'subject' : self.subject,
            'date' : self.date,
            'description' : self.description,
            'user_id' : self.user_id
        }
    

class ToDoTask(models.Model):
    title = models.CharField(max_length=255)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'ToDoTask'
    
    def to_json(self):
        return{
            'id' : self.id,
            'title' : self.title,
            'user_id' : self.user_id
        }