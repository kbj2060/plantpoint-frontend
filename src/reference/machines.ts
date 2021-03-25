import {BaseMachine, CycleMachine, TemperatureRangeMachine, TimeRangeMachine} from "@interfaces/Machine.class";
import {RangeStepper, TimePickerStepper} from "@interfaces/Stepper.class";
import {ReactNode, Ref} from "react";
import {CoolerIcon, FanIcon, HeaterIcon, LEDIcon, RoofFanIcon, WaterpumpIcon} from "@interfaces/Icon.class";
import { getReduxData } from '@funcUtils/getReduxData';
import { StorageKeys } from './constants';

export class EmptyMachine extends BaseMachine {
  automation_type: string; name: string;
  constructor() {
    super();
    this.name = '';
    this.automation_type = '';
  }

  getStepper = (): ReactNode => { return }
  getIcon = (): ReactNode => { return }
  isAirconditionerConflicted = (status: boolean): boolean => {
    return (this.name === "cooler" && status && getReduxData(StorageKeys.SWITCHES)['heater'])
    || (this.name === "heater" && status && getReduxData(StorageKeys.SWITCHES)['cooler'])
  }
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
    return [ WaterPumpMachine, LedMachine, CoolerMachine, HeaterMachine, RoofFanMachine, FanMachine ]
  }
}