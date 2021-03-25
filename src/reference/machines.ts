import {CycleMachine, TemperatureRangeMachine, TimeRangeMachine} from "@interfaces/Machine.class";
import {RangeStepper, TimePickerStepper} from "@interfaces/Stepper.class";
import {ReactNode, Ref} from "react";
import {CoolerIcon, FanIcon, HeaterIcon, LEDIcon, RoofFanIcon, WaterpumpIcon} from "@interfaces/Icon.class";

export class EmptyMachine {
  automation_type: string; name: string;
  constructor() {
    this.name = '';
    this.automation_type = '';
  }

  getStepper = (): ReactNode => { return }
  getIcon = (): ReactNode => { return }
}

export class LedMachine extends TimeRangeMachine{
  automation_type: string;
  constructor() {
    super();
    this.name = 'led';
    this.automation_type = 'TimeRangeMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new RangeStepper(position, ref).render()
  }

  getIcon = (active: boolean = false): ReactNode => {
    return new LEDIcon().iconHandler(active);
  }
}

export class HeaterMachine extends TemperatureRangeMachine {
  automation_type: string;
  constructor() {
    super();
    this.name = 'heater';
    this.automation_type = 'TemperatureRangeMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new RangeStepper(position, ref).render()
  }

  getIcon = (active: boolean = false): ReactNode => {
    return new HeaterIcon().iconHandler(active);
  }
}

export class CoolerMachine extends TemperatureRangeMachine {
  automation_type: string;
  constructor() {
    super();
    this.name = 'cooler';
    this.automation_type = 'TemperatureRangeMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new RangeStepper(position, ref).render()
  }

  getIcon = (active: boolean = false): ReactNode => {
    return new CoolerIcon().iconHandler(active);
  }
}

export class FanMachine extends CycleMachine {
  automation_type: string;
  constructor() {
    super()
    this.name = 'fan';
    this.automation_type = 'CycleMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new TimePickerStepper(position, ref).render()
  }

  getIcon = (active: boolean = false): ReactNode => {
    return new FanIcon().iconHandler(active);
  }
}

export class RoofFanMachine extends CycleMachine {
  automation_type: string;
  constructor() {
    super()
    this.name = 'roofFan';
    this.automation_type = 'CycleMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new TimePickerStepper(position, ref).render()
  }

  getIcon = (active: boolean = false): ReactNode => {
    return new RoofFanIcon().iconHandler(active);
  }
}

export class WaterPumpMachine extends CycleMachine {
  automation_type: string;
  constructor() {
    super()
    this.name = 'waterpump';
    this.automation_type = 'CycleMachine';
  }

  getStepper = (position: string, ref: Ref<any>): ReactNode => {
    return new TimePickerStepper(position, ref).render()
  }

  getIcon = (active: boolean = false): ReactNode => {
    return new WaterpumpIcon().iconHandler(active);
  }
}

export class Machines {
  getMachines = () => {
    return [WaterPumpMachine, LedMachine, CoolerMachine, HeaterMachine, RoofFanMachine, FanMachine]
  }
}