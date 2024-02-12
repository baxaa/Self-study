import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { StudyTipsComponent } from './study-tips/study-tips.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { TodoComponent } from './todo/todo.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AccauntComponent } from './accaunt/accaunt.component';
import { TaskItemComponent } from './task-item/task-item.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    StudyTipsComponent,
    SignInComponent,
    HomeComponent,
    SignUpComponent,
    ProfileComponent,
    TodoComponent,
    TasksComponent,
    CalendarComponent,
    AccauntComponent,
    TaskItemComponent,
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'sign-in', component: SignInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'study-tips', component: StudyTipsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'to-do', component: TodoComponent},
      {path: 'tasks', component: TasksComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'accaunt', component: AccauntComponent}
    ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
