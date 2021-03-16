export abstract class BaseMachine {
  section: string; name: string; automation_type: string; enable: boolean; status: number;
  mqtt_topic: string; start: string[]; end: string[]; term: number;

  constructor( ) {
    this.section = '';
    this.name = '';
    this.automation_type = '';
    this.enable = false;
    this.status = 0;
    this.mqtt_topic = '';
    this.start = [];
    this.end = [];
    this.term = 0;
  }

  public set_status = (status: number) => {
    this.status = status;
  }

  public set_mqtt = (topic: string) => {
    this.mqtt_topic = topic;
  }

  abstract set_automation = (...args: any) => { }

  public checkMachineOn = () => {
    return this.status === 1
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

// export class Machines {
//   machines: BaseMachine[];
//   m_section: string;
//   constructor(m_section: string, machines: BaseMachine[]) {
//     this.m_section = m_section;
//     this.machines = machines;
//   }
// }