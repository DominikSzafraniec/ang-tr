import {Observable, of} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Reservation} from '../model/Reservation';
import {Ticket} from '../model/Ticket';
import {Event} from '../model/Event';


@Injectable()
export class ReservationsService {
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

  addReservation(reservation: Reservation): Observable<Array<Reservation>> {
    return this.http.post<Array<Reservation>>('http://localhost:8080/reservations/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id, JSON.stringify(reservation),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'json'
      });
  }

  deleteReservation(id: number): Observable<Array<Reservation>> {
    return this.http.delete<Array<Reservation>>('http://localhost:8080/reservations/' + id + '/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id);
  }


  getTickets(idRes: number): Observable<Array<Ticket>> {
    return this.http.get<Array<Ticket>>('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/reservations/' + idRes + '/tickets' );
  }




  addTickets(ticket: Ticket, idRes: number): Observable<Array<Ticket>> {
    console.log(JSON.stringify(ticket.event));
    return this.http.post<Array<Ticket>>('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/reservations/' + idRes + '/events/' + ticket.event.id + '/tickets', JSON.stringify(ticket),
      {
        headers: {'Content-Type': 'application/json'},
        responseType: 'json'
      });
  }

  deleteTicket(id: number, idEv: number, idT: number): Observable<Array<Ticket>> {
    return this.http.delete<Array<Ticket>>('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/reservations/' + id + '/events/' + idEv + '/tickets/' + idT);
  }
  getRecomendationGenre(): Observable<Array<Event>>{
    return this.http.get<Array<Event>>('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/genreRecommendations');
  }
  getRecomendationPlace(): Observable<Array <Event>>{
    return this.http.get<Array<Event>>('http://localhost:8080/users/' + (JSON.parse(localStorage.getItem('loggedUser'))).id + '/placeRecommendations');
  }
}
