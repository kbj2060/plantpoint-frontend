import {loadState, saveState} from "../../components/LocalStorage";
import {StorageKeys} from "../../reference/constants";

const SAVE_CURRENT = "SAVE_CURRENT";
const CONTROL_CURRENT = "CONTROL_CURRENT";

export interface ReducerControlCurrentDto {
  machineSection: string;
  machine: string;
  current: number;
}

export type ReducerSaveCurrentsDto = ReducerControlCurrentDto[];

export type ReducerCurrentState = Record<string, number>

export function controlCurrent (current: ReducerControlCurrentDto) {
  return { type: CONTROL_CURRENT, current }
}

export function saveCurrent (current: ReducerSaveCurrentsDto) {
  return { type: SAVE_CURRENT, current }
}

export interface actionTypes {
  type: "CONTROL_CURRENT" | "SAVE_CURRENT";
  current: ReducerControlCurrentDto | ReducerSaveCurrentsDto;
}

const initialState: ReducerCurrentState = loadState(StorageKeys.CURRENT) || {}

function ControlCurrent(
  state =initialState, action: actionTypes
): ReducerCurrentState {
  switch(action.type){
    // case CONTROL_CURRENT:
    //   const {machine, status} = action.current as ReducerControlCurrentDto;
    //   const updatedState: ReducerCurrentState = update(state, {
    //       [machine] : { $set: status >= 1 }
    //   });
    //   saveState(StorageKeys.SWITCHES, updatedState)
    //   return updatedState;

    case SAVE_CURRENT:
      const currents = action.current as ReducerSaveCurrentsDto;
      const cuurentsState: ReducerCurrentState = {} as ReducerCurrentState;
      currents.forEach((current: ReducerControlCurrentDto) => {
        cuurentsState[current.machine] = current.current as number;
      });    
      saveState(StorageKeys.CURRENT, cuurentsState);
      return cuurentsState;

    default:
      return state
  }
}

export default ControlCurrent;