import {Event} from './Event';

export class Ticket {
  id: number;
  seat: string;
  description: string;
  event: Event;
  discount: boolean;
  price: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
