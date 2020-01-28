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
  eventsPage(): void {
    this.router.navigateByUrl('/events');
  }

  logoutFunc(): void {
    localStorage.setItem('loggedUser', null);
    this.router.navigateByUrl('');
  }


  ngOnInit() {
    this.myDisabled = false;
  }
}
