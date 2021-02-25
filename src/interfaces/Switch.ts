import {AvailableMachines, AvailableMachineSection} from "./main";
import {ReducerControlSwitchDto} from "../redux/modules/ControlSwitch";

export interface MachineProps {
  machine: AvailableMachines;
}

export interface CreateSwitchDto {
  machine : AvailableMachines;
  machineSection : AvailableMachineSection;
  status : number;
  controlledBy : string;
}

export interface ResponseSwitchesReadLast extends ReducerControlSwitchDto {}

