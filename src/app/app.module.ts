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

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
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
      }
    ])
  ],
  providers: [
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
