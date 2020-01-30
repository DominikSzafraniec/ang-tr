import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  myDisabled: boolean;

  constructor(private  router: Router) {
  }
  startPage(): void {
    this.router.navigateByUrl('/');
  }
  eventsPage(): void {
    this.router.navigateByUrl('/events');
  }
  usersPage(): void {
    this.router.navigateByUrl('/users');
  }
  reservationsPage(): void {
    this.router.navigateByUrl('/reservations');
  }

  ngOnInit() {
    this.myDisabled = false;
  }
}
