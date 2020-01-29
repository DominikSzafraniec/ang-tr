export class Event {
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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
