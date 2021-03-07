import {loadState} from "@components/LocalStorage";
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

export type ActionTypes = {
  type: "SAVE_MACHINES";
  machines: ReducerMachineDto[];
}

const {machines} = require('../../values/defaults');
const initialState = loadState(StorageKeys.MACHINE) || machines

function ControlMachine(
  state =initialState, action: ActionTypes
): AvailableMachines[] {
  switch(action.type){
    case SAVE_MACHINES:
      return  action.machines.map((m: ReducerMachineDto) => {
        return m.machine
      });
    default:
      return initialState
  }
}

export default ControlMachine;
