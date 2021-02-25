import {loadState, saveState} from "../../components/LocalStorage";
import {StorageKeys} from "../../constants";
import {AvailableMachines, AvailableMachineSection} from "@interfaces/main";

const SAVE_MACHINES = "SAVE_MACHINES";

export interface ReducerMachineDto {
  machine: AvailableMachines;
  machineSection: AvailableMachineSection;
}

export function saveMachines(machines: ReducerMachineDto[]) {
  return { type: SAVE_MACHINES, machines }
}
/*
export type actionTypes = {
  type: "SAVE_MACHINES";
  _switch: ReducerSwitchState;
}*/

const {defaultMachines} = require('../../values/defaults');
const initialState = loadState(StorageKeys.MACHINE) || defaultMachines

function ControlMachine(
  state =initialState, action: any
): AvailableMachines[] {
  switch(action.type){
    case SAVE_MACHINES:
      const _machines =  action.machines.map((m: ReducerMachineDto) => {
        return m.machine
      });
      saveState(StorageKeys.MACHINE, _machines);
      return  _machines;

    default:
      return initialState
  }
}

export default ControlMachine;
