import {AvailableAutomationType} from "./main";

export interface ResponseAutomationRead {
  lastAutomations: Automation[];
}

export interface Automation {
  start: string[];
  end: string[];
  term: number;
  enable: boolean;
  machine: string;
  automationType: AvailableAutomationType;
  machineSection: string;
}


