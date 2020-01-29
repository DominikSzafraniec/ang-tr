import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/LoginService';
import {User} from '../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private  router: Router, private _formBuilder: FormBuilder) {
    this.role = localStorage.getItem('loggedUser');
  }
  user: User;
  login: string;
  password: string;
  role: string;
  loginFunc(): void {
    this.user.username = this.login;
    this.user.password = this.password;
    this.user = this.loginService.tryLogin(this.user);
    if ( this.user != null ) {
      this.role = (JSON.parse(localStorage.getItem('loggedUser'))).role;
    }
  }
  logoutFunc(): void {
    localStorage.setItem('loggedUser', null);
    this.role = null;
    this.router.navigateByUrl('');
  }

  ngOnInit() {
    this.user = new User();
    this.role = localStorage.getItem('loggedUser');
  }

}
