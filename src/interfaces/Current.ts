import {AvailableMachines, AvailableMachineSection} from "@interfaces/main";

export interface ReadCurrentDto {
  machineSection: string;
  machine: string;
}

export interface ResponseCurrentDto extends ReadCurrentDto {
  current: number;
}