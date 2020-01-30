import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Reservation} from '../../model/Reservation';
import {Ticket} from '../../model/Ticket';
import {ReservationsService} from '../../services/ReservationsService';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  firstFormGroup: FormGroup;
  secoundFormGroup: FormGroup;
  reservations: Array<Reservation> = [];
  sendReservation: Reservation;
  reservationEdit: Reservation;
  showReservationPage: string;
  searchReservations: Array<Reservation> = [];
  searchTickets: Array<Ticket> = [];
  roleStorage: string;

  sendTicket: Ticket;
  constructor(private reservationService: ReservationsService, private  router: Router, private _formBuilder: FormBuilder) {
  }

  pageShowed(showedPage: string, reservation: Reservation) {
      if (showedPage === 'read') {
        this.sendReservation.id = null;
      }
      if ( showedPage === 'edit') {
        this.showReservationPage = showedPage;
        this.editReservation(reservation);
      } else {
        this.showReservationPage = showedPage;
        if (localStorage.getItem('role') === 'admin') {
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
      this.firstFormGroup = this._formBuilder.group({
      id: reservation.id,
      description: reservation.description,
    });
      this.pageShowed('read', null);
  }
  addReservation(reservation: Reservation): void {
    this.clearForm();
    this.sendReservation.id = null;
    this.sendReservation.description = reservation.description;
    console.log(this.sendReservation);
    this.sendReservation = this.reservationService.addReservation(this.sendReservation);
    this.pageShowed('add', null);
  }
  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(reservations => {
      this.searchReservations = reservations;
    });
    this.pageShowed('read', null);
  }

  deleteTicket(ticket: Ticket) {
    this.reservationService.deleteTicket(this.sendReservation.id, ticket.event.id, ticket.id).subscribe(tickets => {
      this.searchTickets = tickets;
    });
    this.pageShowed('read', null);
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
    this.secoundFormGroup = this._formBuilder.group({
      id: null,
      event: [''],
      seat: [''],
      discount: false
    });
  }
  addTicket(ticket: Ticket) {
    this.sendTicket.id = null;
    this.sendTicket.seat = ticket.seat;
    this.sendTicket.discount = ticket.discount;
    this.sendTicket.event = ticket.event;
    this.sendReservation.description = ticket.description;
    console.log(this.sendReservation);
    console.log(JSON.stringify(this.reservationService.addTickets(this.sendTicket, this.sendReservation.id  )));
    this.sendTicket = null;
    this.clearForm2();
    this.pageShowed('add', this.sendReservation);
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
      date: Date.now(),

    });
    this.secoundFormGroup = this._formBuilder.group({
      id: null,
      event: [''],
      seat: [''],
      discount: false
    });
    this.pageShowed('read', null);
  }
}
