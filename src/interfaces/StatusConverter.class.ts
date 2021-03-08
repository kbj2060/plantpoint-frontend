export class StatusConverter {
  status: number | boolean;
  constructor(
    status: number | boolean,
  ) {
    this.status = status;
  }
  toSwitchStatus = () => {
    if ( typeof this.status === 'number' ) {
      return this.status >= 1
    } else {
      return this.status
    }
  }
  toDatabaseStatus = () => {
    if ( typeof this.status === 'boolean' ) {
      return this.status ? 1 : 0;
    } else {
      return this.status
    }
  }
}