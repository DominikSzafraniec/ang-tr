import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/User';
import {Event} from '../model/Event';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {
  constructor(public http: HttpClient, private router: Router) {
  }

  tryLogin(loginUser: User): Observable<Array <User>> {
    return this.http.post<Array<User>>('http://localhost:8080/login', JSON.stringify(loginUser),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'json'
      });
  }

}
