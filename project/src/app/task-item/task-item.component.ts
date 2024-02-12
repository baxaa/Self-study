import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ToDoTask} from "../models";
import { StudentService } from '../student.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit{
  @Input() task: ToDoTask;
  @Output() remove = new EventEmitter();
  user_id : string



  constructor(
    private service : StudentService
  ) {
    this.service.changeNameMail()
    this.user_id = this.service.usernameMain
    this.task = new ToDoTask('', this.user_id);
  }

  ngOnInit(): void {
  }

  removeTask() {
    this.remove.emit(this.task.id);
  }
}
