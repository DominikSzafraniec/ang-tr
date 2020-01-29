import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Event} from '../../model/Event';
import {EventService} from '../../services/EventsService';
import {FormBuilder, FormGroup} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';
import {of} from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  firstFormGroup: FormGroup;

  id: number;
  name: string;
  description: string;
  ticketsAvailable: number;
  ticketsTotal: number;
  date: Date;
  place: string;
  eventType: string;
  normalTicketPrice: number;
  discountTicketPrice: number;

  events: Array<Event> = [];
  sendEvent: Event;
  eventEdit: Event;
  showEventPage: string;
  searchEvents: Array<Event> = [];
  roleStorage: string;

  constructor(private eventService: EventService, private  router: Router, private _formBuilder: FormBuilder) {
  }

  pageShowed(showedPage: string, event: Event) {
      if ( showedPage === 'edit') {
        this.showEventPage = showedPage;
        this.editEvent(event);
      } else {
        this.showEventPage = showedPage;
        this.eventService.getEvents().subscribe(events => {
          this.events = events;
        });
      }
    }
    editEvent(event: Event) {
      this.eventEdit = event;
      this.firstFormGroup = this._formBuilder.group({
      id: event.id,
      name: event.name,
      description: event.description,
      ticketsAvailable: event.ticketsAvailable,
      ticketsTotal: event.ticketsTotal,
      date: event.date,
      place: event.place,
      eventType: event.eventType,
      normalTicketPrice: event.normalTicketPrice,
      discountTicketPrice: event.discountTicketPrice
    });
  }
  addEvent(): void {
    this.sendEvent.id = null;
    this.sendEvent.name = this.name;
    this.sendEvent.description = this.description;
    this.sendEvent.ticketsAvailable = this.ticketsAvailable;
    this.sendEvent.ticketsTotal = this.ticketsTotal;
    this.sendEvent.date = this.date;
    this.sendEvent.place = this.place;
    this.sendEvent.eventType = this.eventType;
    this.sendEvent.normalTicketPrice = this.normalTicketPrice;
    this.sendEvent.discountTicketPrice = this.discountTicketPrice;
    console.log(this.sendEvent);
    console.log(JSON.stringify(this.eventService.addEvent(this.sendEvent)));
    this.sendEvent = null;
    this.clearForm();
  }

  updateEvent(event: Event) {
    this.sendEvent.id = this.id;
    this.sendEvent.name = this.name;
    this.sendEvent.description = this.description;
    this.sendEvent.ticketsAvailable = this.ticketsAvailable;
    this.sendEvent.ticketsTotal = this.ticketsTotal;
    this.sendEvent.date = this.date;
    this.sendEvent.place = this.place;
    this.sendEvent.eventType = this.eventType;
    this.sendEvent.normalTicketPrice = this.normalTicketPrice;
    this.sendEvent.discountTicketPrice = this.discountTicketPrice;
    console.log(this.eventService.updateEvent(this.sendEvent));
    this.pageShowed('read', null);
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(events => {
      this.searchEvents = events;
    });
    this.pageShowed('read', null);
  }

  clearForm() {
    this.firstFormGroup = this._formBuilder.group({
      id: 0,
      name: [''],
      description: [''],
      ticketsAvailable: 0,
      ticketsTotal: 0,
      date: Date.now(),
      place: [''],
      eventType: [''],
      normalTicketPrice: 0,
      discountTicketPrice: 0
    });
  }


  ngOnInit() {
    this.sendEvent = new Event();
    this.roleStorage = (JSON.parse(localStorage.getItem('loggedUser'))).role;
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    this.firstFormGroup = this._formBuilder.group({
      id: 0,
      name: [''],
      description: [''],
      ticketsAvailable: 0,
      ticketsTotal: 0,
      date: Date.now(),
      place: [''],
      eventType: [''],
      normalTicketPrice: 0,
      discountTicketPrice: 0
    });
  }

}
