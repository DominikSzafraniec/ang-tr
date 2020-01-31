import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Reservation} from '../model/Reservation';
import {Ticket} from '../model/Ticket';
import {Event} from '../model/Event';
import {JSONP_ERR_NO_CALLBACK} from '@angular/common/http/src/jsonp';


@Injectable()
export class ReservationsService {
  private addedReservation: any;
  constructor(public http: HttpClient, private router: Router) {
  }

  getReservations(): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>('http://localhost:8080/reservations/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id );
  }
  getAllReservations(): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>('http://localhost:8080/reservations/');
  }

  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>('http://localhost:8080/events');
  }

  addReservation(reservation: Reservation): string {
    this.addedReservation = new Reservation();
    this.http.post('http://localhost:8080/reservations/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id, JSON.stringify(reservation),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text'
      }).subscribe(res => {
        return res;
    });
    return null;
  }

  deleteReservation(id: number): Observable<Array<Reservation>> {
    return this.http.delete<Array<Reservation>>('http://localhost:8080/reservations/' + id + '/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id);
  }


  getTickets(idRes: number): Observable<Array<Ticket>> {
    return this.http.get<Array<Ticket>>('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/reservations/' + idRes + 'tickets' );
  }




  addTickets(ticket: Ticket, idRes: number) {
    let addedTicket = null;
    console.log(JSON.stringify(ticket));
    this.http.post('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/reservation/' + idRes + '/events/' + ticket.event.id, JSON.stringify(ticket),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text'
      }).subscribe(res => {
      addedTicket = (<Reservation>JSON.parse(res));
    });
    console.log('debug');
    console.log('debug');
    return addedTicket;
  }

  deleteTicket(id: number, idEv: number, idT: number): Observable<Array<Ticket>> {
    return this.http.delete<Array<Ticket>>('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/reservations/' + id + '/events/' + idEv + '/tickets/' + idT);
  }

}
