import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from "@angular/router";
import { User } from '../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string;
  password: string;
  users : User[] = []
  constructor(
    private router: Router,
    private service: StudentService
  ) {
    this.email = "";
    this.password = "";
  }

  login() {
    this.service.login(this.email, this.password).subscribe((token) => {
      localStorage.setItem('token', token.token);
      this.router.navigate(['/profile'])
    })
    // this.service.getUser().subscribe((users) =>{
    //   this.users = users
    // })
    // console.log(this.users)
    // for (var user of this.users) {
    //   if (user.email === this.email){
    //     if(user.password === this.password){
    //       console.log("Welcome" , user.first_name)
    //       this.router.navigate(['/profile'])
    //     }
    //   }
    // }
    this.email = "";
    this.password = "";
  }
}
