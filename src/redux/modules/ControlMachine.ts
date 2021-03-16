import {loadState, saveState} from "@components/LocalStorage";
import {StorageKeys} from "../../constants";

import {ResponseMachineRead} from "@interfaces/Machine";

const SAVE_MACHINES = "SAVE_MACHINES";

export interface ReducerMachineDto extends ResponseMachineRead {}

export function saveMachines(machines: ReducerMachineDto[]) {
  return { type: SAVE_MACHINES, machines }
}

export type ActionTypes = {
  type: "SAVE_MACHINES";
  machines: ReducerMachineDto[];
}

const initialState = loadState(StorageKeys.MACHINE) || []

function ControlMachine(
  state =initialState, action: ActionTypes
): string[] {
  switch(action.type){
    case SAVE_MACHINES:
      const machines = action.machines.map((m: ReducerMachineDto) => {
        return m.machine
      });
      saveState(StorageKeys.MACHINE, machines)
      return  machines
    default:
      return initialState
  }
}

export default ControlMachine;
