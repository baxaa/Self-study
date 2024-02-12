from rest_framework import serializers
from api.models import Task, Student, ToDoTask
from django.contrib.auth.models import User



class ToDoTaskSerializer1(serializers.Serializer):
    id = serializers.IntegerField(read_only = True)
    title = serializers.CharField()
    user_id = serializers.CharField(default = "")

    def create(self, validated_data):
        user = User.objects.get(id = validated_data.pop('user_id'))
        todotask = ToDoTask.objects.create(user_id = user, **validated_data)
        return todotask
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance

class ToDoTaskSeriaLizer2(serializers.ModelSerializer):
    class Meta:
        model = ToDoTask
        fields = '__all__'


class TaskSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TaskSerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(default = "")
    description = serializers.CharField(default = "")
    date = serializers.CharField(default="")
    subject = serializers.CharField(default="")
    user_id = serializers.CharField(default="")

    def create(self, validated_data):
        # print('-----------------------------------------------')
        user = User.objects.get(id = validated_data.pop('user_id'))
        task = Task.objects.create(user_id = user,**validated_data)
        return task

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance