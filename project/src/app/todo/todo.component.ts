import { Component, OnInit } from '@angular/core';
import { ToDoTask } from '../models';
import { ModelsService } from '../models.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{
  newTasks: ToDoTask[];
  currentTask: ToDoTask;
  user_id : string

  constructor(
    private service : ModelsService,
    private userservice : StudentService
  ) {
    this.newTasks = [];
    this.userservice.changeNameMail()
    this.user_id = this.userservice.usernameMain
    this.currentTask = new ToDoTask('', this.user_id);
  }

  ngOnInit(): void {
    this.getTodoTasks()
  }

  addTask() {
    if(this.currentTask.title !== ''){
        console.log(this.user_id)
      this.service.createToDo(this.currentTask.title).subscribe((task) => {
        this.currentTask.title = ""
        this.ngOnInit()
      })
    } else {
      alert('Enter the title of task');
    }
  }

  getTodoTasks(){
    this.userservice.changeNameMail()
    this.service.getToDoTasks().subscribe((todos) => {
      this.newTasks = todos
      console.log(this.user_id, this.newTasks)
      this.newTasks = this.newTasks.filter((todo) => todo.user_id === this.user_id) 
    })
  }

  // onNewTaskRemove(index: number){
  //   this.newTasks = this.newTasks.filter((x) => x.id !== index);
  //   this.service.deleteTask(index).subscribe((todo) => {
  //     this.ngOnInit()
  //   })
  // }

  deleteToDo(id : number){
    this.service.deleteToDo(id).subscribe((todo) =>{
      this.ngOnInit()
    })
  }

  isDoneChanged(task: ToDoTask){
    console.log(task);
  }
}
