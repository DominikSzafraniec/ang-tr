import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/User';
import {Event} from '../model/Event';

@Injectable()
export class LoginService {
  constructor(public http: HttpClient, private router: Router) {
  }

  tryLogin(loginUser: User): User {
    console.log(JSON.stringify(loginUser));
    this.http.post('http://localhost:8080/login', JSON.stringify(loginUser),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text'
      }).subscribe(res => {
      if (res != null) {
        console.log(res);
        localStorage.setItem('loggedUser', res);
        this.router.navigateByUrl('/events');
      }
    });
    return loginUser;
  }

}
