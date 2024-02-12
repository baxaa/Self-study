import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Task } from '../models';
import { ModelsService } from '../models.service';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  tasks: Task[] = []
  user_id: number
  Events: any[]
  addNewTask : boolean
  ngOnInit(): void {
    this.getTasks()
  }
  constructor(
    private service: ModelsService,
    private userservice: StudentService
  ) {
    this.addNewTask = false
    this.userservice.changeNameMail()
    this.user_id = this.userservice.id
    this.Events = []
  }


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    selectable: true,
    'eventBackgroundColor' : '#1c649b',
    'eventTextColor' : '#fff',
    
  };

  getTasks() {
    this.service.getTasks().subscribe((tasks) => {
      this.tasks = tasks
      this.tasks = this.tasks = this.tasks.filter((task) => task.user_id === this.user_id)
      console.log(this.tasks)
      this.addEvents()
    })
  }

  addEvents() {
    for (var task of this.tasks) {
      this.Events.push({
        title: task.title,
        start: task.date
      })
      // console.log(task, "sadasdasdasd")
    }
    // console.log(this.Events, "asdasdasdsa")
    this.calendarOptions = {
      events: this.Events
    }
  }


}
