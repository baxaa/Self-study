import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { User } from '../user';

@Component({
  selector: 'app-accaunt',
  templateUrl: './accaunt.component.html',
  styleUrls: ['./accaunt.component.css']
})
export class AccauntComponent {
  
  user : User

  constructor(
    private service : StudentService
  ){
    this.user = {} as User
    this.service.changeNameMail()
  }

  
  ngOnInit(): void{
    this.getUser()
  }

  getUser(){
    this.service.changeNameMail()
    this.user.email = this.service.mailMain
    this.user.user_name = this.service.usernameMain
  }
}
