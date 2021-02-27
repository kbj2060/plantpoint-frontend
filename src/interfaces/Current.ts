import {AvailableMachines, AvailableMachineSection} from "@interfaces/main";

export interface ReadCurrentDto {
  machineSection: string;
  machine: string;
}

export interface ResponseCurrentRead extends ReadCurrentDto {
  current: number;
}