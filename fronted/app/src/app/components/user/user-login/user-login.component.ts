import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  imports: [],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit{
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: '',
  };
  loginObj: any = {
    userName: '',
    password: '',
  };
  constructor() {}

  ngOnInit() {}

  onSignup() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
  }

  onLogin() {
    console.log(this.loginObj);
  }

}
