import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/User';

@Injectable()
export class UserService {


  constructor(public http: HttpClient, private router: Router) {
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>('http://localhost:8080/users');
  }
  getUserById(id: number): Observable<Array<User>> {
    return this.http.get<Array<User>>('http://localhost:8080/users/' + id);
  }



  addUser(user: User) {
    let addedUser = null;
    console.log(JSON.stringify(user));
    this.http.post('http://localhost:8080/users', JSON.stringify(user),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text'
      }).subscribe(res => {
      addedUser = (<Event>JSON.parse(res));
    });
    return addedUser;
  }

  deleteUser(id: number): Observable<Array<User>> {
    return this.http.delete<Array<User>>('http://localhost:8080/users/' + id);
  }

  updateUser(user: User) {
    let update = true;
    this.http.put('http://localhost:8080/users/' + user.id, JSON.stringify(user),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text'
      }).subscribe(res => {
      update = (res === 'true');
    });
    return update;
  }
}
