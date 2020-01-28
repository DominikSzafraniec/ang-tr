import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Event} from '../model/Event';

@Injectable()
export class EventService {

  private selectedEvent: Event;

  constructor(public http: HttpClient, private router: Router) {
  }

  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>('http://localhost:8080/events');
  }


  addEvent(event: Event) {
    let addedEvent = null;
    console.log(JSON.stringify(event));
    this.http.post('http://localhost:8080/events', JSON.stringify(event),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text'
      }).subscribe(res => {
      addedEvent = (<Event>JSON.parse(res));
    });
    return addedEvent;
  }

  deleteEvent(id: number): Observable<Array<Event>> {
    return this.http.delete<Array<Event>>('http://localhost:8080/events/' + id);
  }

  updateEvent(event: Event) {
    let update = true;
    this.http.put('http://localhost:8080/events', JSON.stringify(event),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text'
      }).subscribe(res => {
      update = (res === 'true');
    });
    return update;
  }
}
