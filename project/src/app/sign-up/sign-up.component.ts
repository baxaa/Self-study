import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { StudentService } from '../student.service';
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  student: User
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: StudentService
  ) {
    this.student = {} as User
    this.first_name = "";
    this.email = "";
    this.last_name = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  createUser() {
    this.service.createUser(this.first_name, this.last_name, this.email, this.password).subscribe((user)=>{
      this.first_name = "";
      this.email = "";
      this.last_name = "";
      this.password = "";
      this.router.navigate(['/profile'])
    })
  }

}
