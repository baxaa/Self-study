import { Component, OnInit } from '@angular/core';
import { Task} from '../models';
import { ModelsService } from '../models.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks : Task[] = []
  addtask : boolean
  subject_name : string
  date : string
  description : string
  title : string
  details : boolean
  task : Task
  edit : boolean
  user_id : number

  constructor(
    private service : ModelsService,
    private userservice : StudentService
  ){
    this.addtask = false
    this.subject_name = ""
    this.date = ""
    this.description = ""
    this.title = ""
    this.details = false
    this.task = {} as Task
    this.edit = false
    this.userservice.changeNameMail()
    this.user_id = this.userservice.id
  }

  ngOnInit() {
    this.getTasks()
    this.userservice.changeNameMail()
  }
  
  
  getTasks(){
    this.userservice.changeNameMail
    this.service.getTasks().subscribe((tasks) => {
      this.tasks = tasks
      this.tasks = this.tasks.filter((task) => task.user_id === this.user_id)
      // if(this.tasks.length > 0){
      //   console.log("array")
      // }else{
      //   console.log("not array")
      // }
    })
  }

  AddTask(){
    this.addtask = true
    this.details = false
  }

  cancel(){
    this.addtask = false
  }

  createTask(){
    this.userservice.changeNameMail()
    this.service.createTask(this.title, this.description, this.subject_name, this.date).subscribe((task) =>{
      this.title = ""
      this.description = ""
      this.subject_name = ""
      this.date = ""
      this.addtask = false
      this.ngOnInit()
    })
  }

  forupdate(title : string){
    console.log(title)
    this.details = true
    this.addtask = false
    console.log(this.tasks)
    this.task = this.tasks.find(task => task.title === title)!
    console.log(title, this.details, this.task)
    this.ngOnInit()
  }

  close(){
    this.details = false
  }

  deleteTask(id : number){
    this.service.deleteTask(id).subscribe((data) =>{
      this.details = false
      this.tasks = this.tasks.filter((task) => task.id != id)
      this.ngOnInit()
    })
  }

  edit_button(){
    this.edit = true
    this.addtask = false
    this.details = false
  }

  editTask(id : number){
    if (this.title && this.description){
      this.service.updateTask(id, this.title, this.description).subscribe((data)=>{
        this.title = ""
        this.description = ""
        this.edit = false
        this.details = true
        this.ngOnInit()
      })
    }else if(this.title === ""){
      alert('Enter the title of task');
    }else{
      alert('Enter the description of task');
    }
  }
}
