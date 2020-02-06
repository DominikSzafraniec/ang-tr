import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Event} from '../model/Event';

@Injectable()
export class EventService {
  constructor(public http: HttpClient, private router: Router) {
  }

  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>('http://localhost:8080/events');
  }
  getEventsById(id: number): Observable<Array<Event>> {
    return this.http.get<Array<Event>>('http://localhost:8080/events/' + id);
  }



  addEvent(event: Event): Observable<Array<Event>> {
    return this.http.post<Array<Event>>('http://localhost:8080/events', JSON.stringify(event),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'json'
      });
  }

  deleteEvent(id: number): Observable<Array<Event>> {
    return this.http.delete<Array<Event>>('http://localhost:8080/events/' + id);
  }

  updateEvent(event: Event): Observable<Array<Event>> {
    return this.http.put<Array<Event>>('http://localhost:8080/events/' + event.id, JSON.stringify(event),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'json'
      });
  }
}
