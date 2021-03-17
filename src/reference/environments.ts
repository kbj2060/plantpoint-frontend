import {Environment} from "@interfaces/Environment.class";

export class Co2 extends Environment {
  name: string;
  constructor(value: number = 0) {
    super();
    this.value = value;
    this.name = 'co2'
  }

  set = (newValue: number) => {
    this.value = newValue;
  }
}

export class Temperature extends Environment {
  name: string;
  constructor(value: number = 0) {
    super();
    this.value = value;
    this.name = 'temperature'
  }
  set = (newValue: number) => {
    this.value = newValue;
  }
}

export class Humidity extends Environment {
  name: string;
  constructor(value: number = 0) {
    super();
    this.value = value;
    this.name = 'humidity'
  }
  set = (newValue: number) => {
    this.value = newValue;
  }
}

export class Environments {
  getEnvironments = () => {
    return [Co2, Temperature, Humidity]
  }
}