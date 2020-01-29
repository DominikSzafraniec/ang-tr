export class Reservation{
  id: number;
  description: string;
  tickets: string;
  created: Date;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
