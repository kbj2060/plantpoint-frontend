import {loadState, saveState} from "../../components/LocalStorage";
import {DispatchControlSwitchDto} from "../../interfaces/ISwitch";
import update from 'react-addons-update';
import {LocalStorageKeys} from "../../constants";
import {AvailableMachines, AvailableMachineSection} from "../../interfaces/main";

const CONTROL_SWITCH = "CONTROL_SWITCH";
const SAVE_SWITCH = "SAVE_SWITCH";

export type IndividualSwitchState = Record<AvailableMachines, boolean>
export type ReducerSwitchState = Record<AvailableMachineSection, IndividualSwitchState>

export function controlSwitch(_switch: DispatchControlSwitchDto) {
  return { type: CONTROL_SWITCH, _switch }
}

export function saveSwitch(_switch: ReducerSwitchState) {
  return { type: SAVE_SWITCH, _switch }
}

export type actionTypes = {
  type: "CONTROL_SWITCH" | "SAVE_SWITCH";
  _switch: ReducerSwitchState | DispatchControlSwitchDto;
}

const {defaultSwitchesState} = require('../../values/defaults');
const initialState: ReducerSwitchState =
  loadState(LocalStorageKeys.SWITCHES) || defaultSwitchesState

function ControlSwitch(
  state =initialState, action: actionTypes
): ReducerSwitchState {
  switch(action.type){

    case CONTROL_SWITCH:
      const {machineSection, machine, status} = action._switch as DispatchControlSwitchDto;
      const updatedState: ReducerSwitchState = update(state, {
        [machineSection] : {
          [machine] : { $set: status }
        }
      });
      saveState(LocalStorageKeys.SWITCHES, updatedState)
      return updatedState;

    case SAVE_SWITCH:
      return action._switch as ReducerSwitchState;

    default:
      return state
  }
}

export default ControlSwitch;