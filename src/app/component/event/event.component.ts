import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Event} from '../../model/Event';
import {EventService} from '../../services/EventsService';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  firstFormGroup: FormGroup;
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
      this.pageShowed('read', null);
  }
  addEvent(event: Event): void {
    this.sendEvent.id = null;
    this.sendEvent.name = event.name;
    this.sendEvent.description = event.description;
    this.sendEvent.ticketsAvailable = event.ticketsAvailable;
    this.sendEvent.ticketsTotal = event.ticketsTotal;
    this.sendEvent.date = event.date;
    this.sendEvent.place = event.place;
    this.sendEvent.eventType = event.eventType;
    this.sendEvent.normalTicketPrice = event.normalTicketPrice;
    this.sendEvent.discountTicketPrice = event.discountTicketPrice;
    console.log(this.sendEvent);
    console.log(JSON.stringify(this.eventService.addEvent(this.sendEvent)));
    this.sendEvent = null;
    this.clearForm();
    this.pageShowed('read', null);
  }

  updateEvent(event: Event) {
    this.eventEdit.name = event.name;
    this.eventEdit.description = event.description;
    this.eventEdit.ticketsAvailable = event.ticketsAvailable;
    this.eventEdit.ticketsTotal = event.ticketsTotal;
    this.eventEdit.date = event.date;
    this.eventEdit.place = event.place;
    this.eventEdit.eventType = event.eventType;
    this.eventEdit.normalTicketPrice = event.normalTicketPrice;
    this.eventEdit.discountTicketPrice = event.discountTicketPrice;
    console.log(this.eventService.updateEvent(this.eventEdit));
    this.clearForm();
    this.eventEdit = null;
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
    this.pageShowed('read', null);
  }
}
