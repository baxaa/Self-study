import json
from api.models import Task
from api.serializers import TaskSerializer2, TaskSerializer1
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status




@csrf_exempt
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        tasks = [p.to_json() for p in tasks]
        serializer = TaskSerializer1(tasks,many = True)
        return JsonResponse(serializer.data,safe = False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = TaskSerializer2(data = data)
        print(serializer.is_valid())
        if serializer.is_valid():
            print("khbfquiwkjhdoqlk")
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors)


@csrf_exempt
def task_detail(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist as e:
        return JsonResponse({'error': str(e)}, status=400)

    if request.method == 'GET':
        serializer = TaskSerializer2(task)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = json.loads(request.body)
        serializer = TaskSerializer2(instance=task, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        print('asdas')
        task.delete()
        return JsonResponse({'deleted': True})
    


@api_view(['GET', 'POST'])
def task_list1(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer2(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TaskSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def task_detail1(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = TaskSerializer2(task)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer2(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        task.delete()
        return Response({'deleted': True})
    


class TaskListAPIView(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer1(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskDetailAPIView(APIView):
    def get_object(self, task_id):
        try:
            return Task.objects.get(pk=task_id)
        except Task.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, task_id):
        instance = self.get_object(task_id)
        serializer = TaskSerializer1(instance)
        return Response(serializer.data)

    def put(self, request, task_id):
        instance = self.get_object(task_id)
        serializer = TaskSerializer2(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, task_id):
        instance = self.get_object(task_id)
        instance.delete()
        return Response({'deleted': True})