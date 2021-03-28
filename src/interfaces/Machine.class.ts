import { getReduxData } from '@funcUtils/getReduxData';
import { StorageKeys } from '../reference/constants';

export abstract class BaseMachine {
  section: string; name: string; automation_type: string; enable: boolean; status: number;
  start: string[]; end: string[]; term: number;

  constructor( ) {
    this.section = '';
    this.name = '';
    this.automation_type = '';
    this.enable = false;
    this.status = 0;
    this.start = [];
    this.end = [];
    this.term = 0;
  }

  public set_status = (status: number) => {
    this.status = status;
  }

  public isCycleMachineType = (): boolean => {
    return this.automation_type === 'CycleMachine';
  }

  public isAirconditionerConflicted = (status: boolean): boolean => {
    console.log(this.name, status, getReduxData(StorageKeys.SWITCHES)['heater'], getReduxData(StorageKeys.SWITCHES)['cooler'])
    return (this.name === "cooler" && status && getReduxData(StorageKeys.SWITCHES)['heater'])
    || (this.name === "heater" && status && getReduxData(StorageKeys.SWITCHES)['cooler'])
  }
}

export class RangeMachine extends BaseMachine {
  set_automation = (automation_type: string, enable: boolean, start: string[], end: string[]) => {
    this.automation_type = automation_type;
    this.enable = enable;
    this.start = start;
    this.end = end;
  }
}

export class TemperatureRangeMachine extends RangeMachine { }

export class TimeRangeMachine extends RangeMachine { }

export class CycleMachine extends BaseMachine {
  set_automation = (automation_type: string, enable: boolean, start: string[], end: string[], term: number) => {
    this.automation_type = automation_type;
    this.enable = enable;
    this.start = start;
    this.end = end;
    this.term = term;
  }
}
