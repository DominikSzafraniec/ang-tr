import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule   } from '@angular/material';

import {EventService} from './services/EventsService';
import {EventComponent} from './component/event/event.component';
import {LoginComponent} from './component/login/login.component';
import {LoginService} from './services/LoginService';
import {UserComponent} from './component/user/user.component';
import {UserService} from './services/UsersService';
import {ReservationComponent} from './component/reservation/reservation.component';
import {ReservationsService} from './services/ReservationsService';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    UserComponent,
    LoginComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot([
      {
        path: 'events',
        component: EventComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'reservations',
        component: ReservationComponent
      },
      {
        path: '',
        component: LoginComponent
      }
    ])
  ],
  providers: [
    EventService,
    UserService,
    LoginService,
    ReservationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
