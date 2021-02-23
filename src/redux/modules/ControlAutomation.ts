import {loadState} from "../../components/LocalStorage";
import {LocalStorageKeys} from "../../constants";
import {AvailableAutomationType, AvailableMachines, AvailableMachineSection} from "../../interfaces/main";

const CONTROL_AUTOMATION = "CONTROL_AUTOMATION";
const RESET_AUTOMATION = "RESET_AUTOMATION";
const SAVE_AUTOMATION = "SAVE_AUTOMATION";

export type Automation = {
  start: string[];
  end: string[];
  term: number;
  enable: boolean;
  machine: AvailableMachines;
  automationType: AvailableAutomationType;
  machineSection: AvailableMachineSection;
}

export type ReducerAutomationState = Record<AvailableMachines, Automation>

export const  controlAutomation = (automation: Automation) => {
  return { type: CONTROL_AUTOMATION, automation }
}

export const  saveAutomation = (automation: ReducerAutomationState) => {
  return { type: SAVE_AUTOMATION, automation }
}

export const  resetAutomation = () => {
  return { type: RESET_AUTOMATION }
}

const {defaultAutomation} = require('../../values/defaults');
let initialState = loadState(LocalStorageKeys.AUTO) || defaultAutomation

function ControlAutomation(
  state = initialState, action: any
): ReducerAutomationState {
  switch(action.type){
    case CONTROL_AUTOMATION:
      const key = action.automation.machine;
      return { ...state, [key]: action.automation };

    case SAVE_AUTOMATION:
      return action.automation;

    case RESET_AUTOMATION:
      return defaultAutomation;

    default:
      return state
  }
}

export default ControlAutomation;