from django.contrib import admin

from api.models import Student
from api.models import Task, ToDoTask

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'password', 'secret_word')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date', 'subject', 'description')

@admin.register(ToDoTask)
class ToDoTaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title','user_id')