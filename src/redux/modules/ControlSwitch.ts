import {loadState, saveState} from "../../components/LocalStorage";
import update from 'react-addons-update';
import {StorageKeys} from "../../constants";
import {AvailableMachines, AvailableMachineSection} from "@interfaces/main";

const CONTROL_SWITCH = "CONTROL_SWITCH";
const SAVE_SWITCH = "SAVE_SWITCH";

export type ReducerControlSwitchDto = {
  machineSection: AvailableMachineSection;
  machine: AvailableMachines;
  status: number | boolean;
}
export type ReducerSaveSwitchesDto = Record<AvailableMachines, ReducerControlSwitchDto>;
export type ReducerSwitchState = Record<AvailableMachines, boolean>

export function controlSwitch(_switch: ReducerControlSwitchDto) {
  return { type: CONTROL_SWITCH, _switch }
}

export function saveSwitch(_switch: ReducerSaveSwitchesDto) {
  return { type: SAVE_SWITCH, _switch }
}

export interface actionTypes {
  type: "CONTROL_SWITCH" | "SAVE_SWITCH";
  _switch: ReducerSaveSwitchesDto | ReducerControlSwitchDto;
}

const {defaultSwitchesState} = require('../../values/defaults');
const initialState: ReducerSwitchState =
  loadState(StorageKeys.SWITCHES) || defaultSwitchesState

function ControlSwitch(
  state =initialState, action: actionTypes
): ReducerSwitchState {
  switch(action.type){
    case CONTROL_SWITCH:
      const {machine, status} = action._switch as ReducerControlSwitchDto;
      const updatedState: ReducerSwitchState = update(state, {
          [machine] : { $set: status >= 1 }
      });
      saveState(StorageKeys.SWITCHES, updatedState)
      return updatedState;

    case SAVE_SWITCH:
      const switches = action._switch as ReducerSaveSwitchesDto;
      const reducerSwitchState: ReducerSwitchState = {} as ReducerSwitchState;
      Object.keys(switches).forEach((key: string) => {
        reducerSwitchState[key as AvailableMachines] =
          switches[key as AvailableMachines]['status'] >= 1;
      })
      return reducerSwitchState;

    default:
      return state
  }
}

export default ControlSwitch;