import json
from api.models import ToDoTask
from api.serializers import ToDoTaskSerializer1, ToDoTaskSeriaLizer2
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.decorators import api_view
from rest_framework import status

# @csrf_exempt
# def todo_list(request):
#     if request.method == "GET":
#         todos = ToDoTask.objects.all()
#         todos = [p.to_json() for p in todos]
#         serializer = ToDoTaskSerializer1(todos, many = True)
#         return JsonResponse(serializer.data, safe=False)
#     elif request.method == 'POST':
#         data = json.loads(request.body)
#         serializer = ToDoTaskSeriaLizer2(data = data)
#         print(serializer.is_valid())
#         if serializer.is_valid():
#             print("khbfquiwkjhdoqlk")
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors)

@api_view(['GET', 'POST'])
def todo_list1(request):
    if request.method == 'GET':
        todos = ToDoTask.objects.all()
        serializer = ToDoTaskSeriaLizer2(todos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ToDoTaskSerializer1(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
   
@api_view(['GET', 'PUT', 'DELETE'])
def todo_detail(request, todo_id):
    try:
        todo = ToDoTask.objects.get(id=todo_id)
    except ToDoTask.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = ToDoTaskSeriaLizer2(todo)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ToDoTaskSerializer1(instance=todo, data=request.data)
        if serializer.is_valid():
            print("sajkdnkajsndl")
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        todo.delete()
        return Response({'deleted': True})
    



class ToDoListAPIView(APIView):
    def get(self, request):
        todos = ToDoTask.objects.all()
        serializer = ToDoTaskSerializer1(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ToDoTaskSeriaLizer2(data=request.data)
        if serializer.is_valid():
            print("sdadsadasda")
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ToDoDetailAPIView(APIView):
    def get_object(self, todo_id):
        try:
            return ToDoTask.objects.get(pk=todo_id)
        except ToDoTask.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, todo_id):
        instance = self.get_object(todo_id)
        serializer = ToDoTaskSerializer1(instance)
        return Response(serializer.data)

    def put(self, request, todo_id):
        instance = self.get_object(todo_id)
        serializer = ToDoTaskSerializer1(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, todo_id):
        instance = self.get_object(todo_id)
        instance.delete()
        return Response({'deleted': True})