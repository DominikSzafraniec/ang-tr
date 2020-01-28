import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Event} from '../../model/Event';
import {EventService} from '../../services/EventsService';
import {FormBuilder, FormGroup} from '@angular/forms';
import {forEach} from '@angular/router/src/utils/collection';
import {of} from 'rxjs';

@Component({
  selector: 'app-declaration',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  firstFormGroup: FormGroup;

  id: number;
  name: string;
  description: string;
  ticketAvailable: number;
  ticketTotal: number;
  date: Date;
  place: string;
  eventType: string;
  normalTicketPrice: number;
  discountTicketPrice: number;

  events: Array<Event> = [];
  sendEvent: Event;

  editEvent: Event;
  showEventPage: string;
  searchEvents: Array<Event> = [];
  roleStorage: string;

  constructor(private eventService: EventService, private  router: Router, private _formBuilder: FormBuilder) {
  }

  pageShowed(showedPage: string, event: Event) {
    this.showEventPage = showedPage;
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
    }

  addEvent(): void {
    this.sendEvent.id = null;
    this.sendEvent.name = this.name;
    this.sendEvent.description = this.description;
    this.sendEvent.ticketAvailable = this.ticketAvailable;
    this.sendEvent.ticketTotal = this.ticketTotal;
    this.sendEvent.date = this.date;
    this.sendEvent.place = this.place;
    this.sendEvent.eventType = this.eventType;
    this.sendEvent.normalTicketPrice = this.normalTicketPrice;
    this.sendEvent.discountTicketPrice = this.discountTicketPrice;
    console.log('this.sendEvent');
    console.log(this.sendEvent);
    console.log(JSON.stringify(this.eventService.addEvent(this.sendEvent)));
  }

  updateEvent(event: Event) {

  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(events => {
      this.events = events;
      this.searchEvents = events;
    });
    console.log(this.sendEvent);
  }


  ngOnInit() {
    this.sendEvent = new Event();

    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    this.firstFormGroup = this._formBuilder.group({
      id: 0,
      name: [''],
      description: [''],
      ticketAvailable: [''],
      ticketTotal: [''],
      date: Date,
      place: [''],
      eventType: [''],
      normalTicketPrice: [''],
      discountTicketPrice: ['']
    });
  }

}
