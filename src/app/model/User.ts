export class User {
  id: number;
  username: string;
  role: string;
  password: string;
  firstName: string;
  familyName: string;
  address: string;
  phoneNumber: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
