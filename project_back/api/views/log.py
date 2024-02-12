import json
from urllib import response
from django.shortcuts import render
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib.auth.models import User


@csrf_exempt
def login(request):
    if request.method == 'POST':
        response = obtain_jwt_token(request)
        return response
    else:
        return JsonResponse({'message': 'Invalid request method.'})
    
@csrf_exempt 
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        userName = data.get('first_name')

        password = data.get('password')

        email = data.get('email')

        first_name = data.get('first_name')

        last_name = data.get('last_name')

        user = User.objects.create_user(username=userName,password=password,email=email, first_name = first_name, last_name = last_name)

        user.save()
        return JsonResponse({'message': 'User created successfully.'})
    else:
        return JsonResponse({'message': 'Invalid request method.'})

