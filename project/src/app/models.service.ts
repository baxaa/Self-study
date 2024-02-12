import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthToken } from './models';
import { Task, ToDoTask } from './models';
import { User } from './user';
import { StudentService } from './student.service';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class ModelsService implements OnInit{
  BASE_URL = 'http://localhost:8000'
  user_id : number
  constructor(
    private client: HttpClient,
    private service: StudentService
  ) { 
    this.service.changeNameMail()
    this.user_id = this.service.id
  }
  ngOnInit(): void {
    // this.service.changeNameMail()
    this.user_id = this.service.id
  }
  
  getTasks(): Observable<Task[]> {
    console.log(this.service.id)
    return this.client.get<Task[]>(
      `${this.BASE_URL}/tasks`
    )
  }

  createTask(title: string, description: string, subject: string, date: string): Observable<Task> {
    // this.service.changeNameMail()
    console.log(this.user_id)
    return this.client.post<Task>(
      `${this.BASE_URL}/tasks`,
      { title, description, subject, date, user_id : this.user_id}
    )
  }

  deleteTask(task_id : number) : Observable<Task> {
    return this.client.delete<Task> (
      `${this.BASE_URL}/tasks/${task_id}`
    )
  }

  updateTask(task_id : number, title : string, description : string) : Observable<Task> {
    return this.client.put<Task> (
      `${this.BASE_URL}/tasks/${task_id}`,
      {title : title, description : description}
    )
  }

  getToDoTasks() : Observable<ToDoTask[]>{
    return this.client.get<ToDoTask[]>(
      `${this.BASE_URL}/todo`
    )
  }

  createToDo(title : string) : Observable<ToDoTask> {
    return this.client.post<ToDoTask>(
      `${this.BASE_URL}/todo`,
      {title, user_id : this.user_id}
    )
  }

  deleteToDo(todo_id : number) : Observable<ToDoTask> {
    return this.client.delete<ToDoTask> (
      `${this.BASE_URL}/todo/${todo_id}`
    )
  }


}
