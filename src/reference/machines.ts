import {CycleMachine, TemperatureRangeMachine, TimeRangeMachine} from "@interfaces/Machine";
import {RangeStepper, TimePickerStepper} from "@interfaces/Stepper.class";
import {ReactNode, Ref} from "react";
import {CoolerIcon, FanIcon, HeaterIcon, LEDIcon, RoofFanIcon, WaterpumpIcon} from "@interfaces/Icon.class";

export class EmptyMachine {
  machineType: string; name: string;
  constructor() {
    this.name = '';
    this.machineType = '';
  }

  getStepper = (): ReactNode => { return }
  getIcon = (): ReactNode => { return }
}

export class LedMachine extends TimeRangeMachine{
  machineType: string;
  constructor() {
    super();
    this.name = 'led';
    this.machineType = 'TimeRangeMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new RangeStepper(position, ref).render()
  }

  getIcon = (active: boolean): ReactNode => {
    return new LEDIcon().iconHandler(active);
  }
}

export class HeaterMachine extends TemperatureRangeMachine {
  machineType: string;
  constructor() {
    super();
    this.name = 'heater';
    this.machineType = 'TemperatureRangeMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new RangeStepper(position, ref).render()
  }

  getIcon = (active: boolean): ReactNode => {
    return new HeaterIcon().iconHandler(active);
  }
}

export class CoolerMachine extends TemperatureRangeMachine {
  machineType: string;
  constructor() {
    super();
    this.name = 'cooler';
    this.machineType = 'TemperatureRangeMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new RangeStepper(position, ref).render()
  }

  getIcon = (active: boolean): ReactNode => {
    return new CoolerIcon().iconHandler(active);
  }
}

export class FanMachine extends CycleMachine {
  machineType: string;
  constructor() {
    super()
    this.name = 'fan';
    this.machineType = 'CycleMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new TimePickerStepper(position, ref).render()
  }

  getIcon = (active: boolean): ReactNode => {
    return new FanIcon().iconHandler(active);
  }
}

export class RoofFanMachine extends CycleMachine {
  machineType: string;
  constructor() {
    super()
    this.name = 'roofFan';
    this.machineType = 'CycleMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new TimePickerStepper(position, ref).render()
  }

  getIcon = (active: boolean): ReactNode => {
    return new RoofFanIcon().iconHandler(active);
  }
}

export class WaterPumpMachine extends CycleMachine {
  machineType: string;
  constructor() {
    super()
    this.name = 'waterpump';
    this.machineType = 'CycleMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new TimePickerStepper(position, ref).render()
  }

  getIcon = (active: boolean): ReactNode => {
    return new WaterpumpIcon().iconHandler(active);
  }
}