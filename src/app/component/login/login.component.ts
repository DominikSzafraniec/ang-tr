import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/LoginService';
import {User} from '../../model/User';
import {Reservation} from '../../model/Reservation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private  router: Router, private _formBuilder: FormBuilder) {
  }
  user: User;
  searchUser: Array<User> = [];
  login: string;
  password: string;
  role: string;
  loginFunc(): void {
    this.user.username = this.login;
    this.user.password = this.password;
    this.loginService.tryLogin(this.user).subscribe(res => {
      this.searchUser = res;
      console.log('res ' + res);
      if (res != null) {
        console.log('res ' + res);
        localStorage.setItem('loggedUser', JSON.stringify(this.searchUser));
        this.role = (JSON.parse(localStorage.getItem('loggedUser'))).role;
        this.router.navigateByUrl('/events');
      }
    });
  }
  logoutFunc(): void {
    localStorage.setItem('loggedUser', null);
    this.role = null;
    this.router.navigateByUrl('');
  }

  ngOnInit() {
    this.user = new User();
    this.role = (JSON.parse(localStorage.getItem('loggedUser'))).role;
  }

}
