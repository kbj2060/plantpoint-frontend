import {AvailableAutomationType, AvailableMachines, AvailableMachineSection} from "./main";

export interface ResponseAutomationRead {
  lastAutomations: Automation[];
}

export interface Automation {
  start: string[];
  end: string[];
  term: number;
  enable: boolean;
  machine: AvailableMachines;
  automationType: AvailableAutomationType;
  machineSection: AvailableMachineSection;
}


