from django.urls import path

from api import views

urlpatterns = [
    # ----------------------------------------------------------------
    # login and logout with token
    path('student', views.register),
    path('login', views.login),

    # ----------------------------------------------------------------
    # views
    # path('tasks', views.task_list),
    # path('tasks/<int:task_id>', views.task_detail),

    # ----------------------------------------------------------------
    # function based views
    # path('tasks', views.task_list1),
    # path('tasks/<int:task_id>', views.task_detail1),

    # ----------------------------------------------------------------
    # function based views for todo task
    # path('todo', views.todo_list1),
    # path('todo/<int:todo_id>', views.todo_detail),

    # ----------------------------------------------------------------
    # class based views fo todo
    path('todo', views.ToDoListAPIView.as_view()),
    path('todo/<int:todo_id>', views.ToDoDetailAPIView.as_view()),

    # ----------------------------------------------------------------
    # class based for tasks
    path('tasks', views.TaskListAPIView.as_view()),
    path('tasks/<int:task_id>', views.TaskDetailAPIView.as_view())
]
