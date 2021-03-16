import {ReducerControlSwitchesDto} from "@redux/modules/ControlSwitch";

export interface CreateSwitchDto {
  machine : string;
  machineSection : string;
  status : number;
  controlledBy : string;
}

export interface ResponseSwitchesReadLast extends ReducerControlSwitchesDto {}

