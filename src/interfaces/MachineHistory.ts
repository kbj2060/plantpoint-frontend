import {AvailableMachines} from "@interfaces/main";

export interface SingleSwitchHistory {
  machine: AvailableMachines;
  status: number;
  controlledBy: string;
  created: string;
}

export interface ResponseSwitchHistoryRead {
  switchHistory: SingleSwitchHistory[];
}