import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Reservation} from '../../model/Reservation';
import {Ticket} from '../../model/Ticket';
import {Event} from '../../model/Event';
import {ReservationsService} from '../../services/ReservationsService';
import {FormBuilder, FormGroup} from '@angular/forms';
import {parseIntAutoRadix} from '@angular/common/src/i18n/format_number';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  reservations: Array<Reservation> = [];
  public sendReservation: Reservation;
  reservationEdit: Reservation;
  showReservationPage: string;
  searchReservations: Array<Reservation> = [];
  searchEvent: Array<Event> = [];
  searchTickets: Array<Ticket> = [];
  roleStorage: string;

  sendTicket: Ticket;
  constructor(private reservationService: ReservationsService, private  router: Router, private _formBuilder: FormBuilder) {
  }

  pageShowed(showedPage: string, reservation: Reservation) {
      if (showedPage === 'read') {
        this.sendReservation.id = 0;
      }
      if ( showedPage === 'edit') {
        this.showReservationPage = showedPage;
        this.editReservation(reservation);
      } else {
        this.showReservationPage = showedPage;
        if (this.roleStorage === 'admin') {
          this.reservationService.getAllReservations().subscribe(reservations => {
            this.reservations = reservations;
          });
        } else {
          this.reservationService.getReservations().subscribe(reservations => {
            this.reservations = reservations;
          });
        }
      }
    }
    editReservation(reservation: Reservation) {
      this.reservationEdit = reservation;
      this.sendReservation = reservation;
      this.firstFormGroup = this._formBuilder.group({
      id: reservation.id,
      description: reservation.description,
    });
      this.reservationService.getEvents().subscribe(events => {
        this.searchEvent = events;
        this.clearForm();
        this.pageShowed('add', null);
      });
  }
  addReservation(reservation: Reservation) {
    this.reservationService.addReservation(reservation).subscribe(
      reservations => {
        this.searchReservations = reservations;
        this.sendReservation = JSON.parse(JSON.stringify(this.searchReservations));
        this.reservationService.getEvents().subscribe(events => {
          this.searchEvent = events;
          this.clearForm();
          this.pageShowed('add', null);
        });
      });
  }
  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(reservations => {
      this.searchReservations = reservations;
      this.pageShowed('read', null);
    });
  }

  deleteTicket(ticket: Ticket) {
    this.reservationService.deleteTicket(this.sendReservation.id, ticket.event.id, ticket.id).subscribe(tickets => {
      this.searchTickets = tickets;
      this.pageShowed('read', null);
    });
  }

  clearForm() {
    this.firstFormGroup = this._formBuilder.group({
      id: 0,
      description: [''],
      tickets: [''],
      created: Date.now(),
    });
  }
  clearForm2() {
    this.secondFormGroup = this._formBuilder.group({
      id: 0,
      seat: 0,
      description: [''],
      event: new Event,
      discount: false
    });
  }
  addTicket(ticket: Ticket) {
    this.sendTicket.id = 0;
    this.sendTicket.seat = ticket.seat;
    this.sendTicket.discount = ticket.discount;
    this.sendTicket.event = new Event();
    this.sendTicket.event.id =  ticket.id;
    this.reservationService.addTickets(this.sendTicket, this.sendReservation.id).subscribe(res => {
    this.sendTicket = new Ticket();
      this.reservationService.getTickets(this.sendReservation.id).subscribe(
        tic => {
          this.searchTickets = tic;
          this.clearForm2();
          this.pageShowed('add', this.sendReservation);
        });
  });
  }

  ngOnInit() {
    this.sendReservation = new Reservation();
    this.sendTicket = new Ticket();
    this.roleStorage = (JSON.parse(localStorage.getItem('loggedUser'))).role;
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });

    this.firstFormGroup = this._formBuilder.group({
      id: 0,
      description: [''],
      tickets: [''],
      date: Date.now()
    });
    this.secondFormGroup = this._formBuilder.group({
      id: 0,
      seat: 0,
      description: [''],
      event: new Event,
      discount: false
    });
    this.pageShowed('read', null);
  }
}
