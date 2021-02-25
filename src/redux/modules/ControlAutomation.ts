import {loadState, saveState} from "../../components/LocalStorage";
import {StorageKeys} from "../../constants";
import {AvailableAutomationType, AvailableMachines, AvailableMachineSection} from "@interfaces/main";
import update  from 'immutability-helper';

const CONTROL_AUTOMATION = "CONTROL_AUTOMATION";
const RESET_AUTOMATION = "RESET_AUTOMATION";
const SAVE_AUTOMATION = "SAVE_AUTOMATION";

export interface ReducerAutomationDto {
  start: number[];
  end: number[];
  term: number;
  enable: boolean;
  machine: AvailableMachines;
  automationType: AvailableAutomationType;
  machineSection: AvailableMachineSection;
}

export type ReducerAutomationState = Record<AvailableMachines, ReducerAutomationDto>

export const  controlAutomation = (automation: ReducerAutomationDto) => {
  return { type: CONTROL_AUTOMATION, automation }
}

export const  saveAutomation = (automation: ReducerAutomationState) => {
  return { type: SAVE_AUTOMATION, automation }
}

export const  resetAutomation = () => {
  return { type: RESET_AUTOMATION }
}

export type actionTypes = {
  type: "CONTROL_AUTOMATION" | "SAVE_AUTOMATION" | 'RESET_AUTOMATION';
  automation: ReducerAutomationDto | ReducerAutomationState;
}

const {defaultAutomations} = require('../../values/defaults');
let initialState: ReducerAutomationState = loadState(StorageKeys.AUTO) || defaultAutomations

function ControlAutomation(
  state = initialState, action: actionTypes
): ReducerAutomationState {
  switch(action.type){
    case CONTROL_AUTOMATION:
      const {machine} = action.automation as ReducerAutomationDto;
      const updated: ReducerAutomationState = update(state, {
        [machine]: { $set: action.automation }
      });
      saveState(StorageKeys.AUTO, updated)
      return updated;

    case SAVE_AUTOMATION:
      const automation = action.automation as ReducerAutomationState;
      Object.keys(initialState).forEach((key) => {
        if ( !Object.keys(automation).includes(key) ) {
          automation[key as AvailableMachines] = initialState[key as AvailableMachines]
        }
      })
      saveState(StorageKeys.AUTO, automation)
      return automation as ReducerAutomationState;

    case RESET_AUTOMATION:
      return defaultAutomations;

    default:
      return state
  }
}

export default ControlAutomation;