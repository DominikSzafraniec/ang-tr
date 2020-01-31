import {Ticket} from './Ticket';

export class Reservation {
  id: number;
  description: string;
  tickets: Array <Ticket>;
  created: Date;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
