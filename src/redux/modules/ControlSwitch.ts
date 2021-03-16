import {loadState, saveState} from "../../components/LocalStorage";
import update from 'react-addons-update';
import {StorageKeys} from "../../reference/constants";

const CONTROL_SWITCH = "CONTROL_SWITCH";
const SAVE_SWITCH = "SAVE_SWITCH";

export interface ReducerControlSwitchesDto {
  machineSection: string;
  machine: string;
  status: number | boolean;
}
export type ReducerSaveSwitchesDto = Record<string, ReducerControlSwitchesDto>;
export type ReducerSwitchState = Record<string, boolean>

export function controlSwitch(_switch: ReducerControlSwitchesDto) {
  return { type: CONTROL_SWITCH, _switch }
}

export function saveSwitch(_switch: ReducerSaveSwitchesDto) {
  return { type: SAVE_SWITCH, _switch }
}

export interface actionTypes {
  type: "CONTROL_SWITCH" | "SAVE_SWITCH";
  _switch: ReducerSaveSwitchesDto | ReducerControlSwitchesDto;
}

const initialState: ReducerSwitchState = loadState(StorageKeys.SWITCHES) || {}

function ControlSwitch(
  state =initialState, action: actionTypes
): ReducerSwitchState {
  switch(action.type){
    case CONTROL_SWITCH:
      const {machine, status} = action._switch as ReducerControlSwitchesDto;
      const updatedState: ReducerSwitchState = update(state, {
          [machine] : { $set: status >= 1 }
      });
      saveState(StorageKeys.SWITCHES, updatedState)
      return updatedState;

    case SAVE_SWITCH:
      const switches = action._switch as ReducerSaveSwitchesDto;
      const reducerSwitchState: ReducerSwitchState = {} as ReducerSwitchState;
      Object.keys(switches).forEach((key: string) => {
        reducerSwitchState[key as string] = switches[key as string]['status'] >= 1;
      })
      saveState(StorageKeys.SWITCHES, reducerSwitchState);
      return reducerSwitchState;

    default:
      return state
  }
}

export default ControlSwitch;