import {AvailableMachines, AvailableMachineSection} from "@interfaces/main";

export interface ResponseMachineRead {
  machine: AvailableMachines;
  machineSection: AvailableMachineSection;
}