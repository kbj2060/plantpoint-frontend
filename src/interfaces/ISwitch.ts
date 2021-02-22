import {AvailableMachines, AvailableMachineSection} from "./main";

export type MachineProps = {
  machine: AvailableMachines;
}

export type CreateSwitchDto = {
  machine : AvailableMachines;
  machineSection : AvailableMachineSection;
  status : number;
  controlledBy : string;
}

export type DispatchControlSwitchDto = {
  machineSection: AvailableMachineSection;
  machine: AvailableMachines;
  status: boolean;
}

