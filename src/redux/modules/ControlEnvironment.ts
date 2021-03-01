import {loadState} from "@components/LocalStorage";
import {StorageKeys} from "../../constants";
import {AvailableEnvironmentSection} from "@interfaces/main";
import update from "immutability-helper";

const CONTROL_ENVIRONMENT = "CONTROL_ENVIRONMENT";

export interface ReducerEnvironmentDto {
  environmentSection : AvailableEnvironmentSection;
  co2: number;
  humidity: number;
  temperature: number;
}

export type ReducerEnvironmentState = Record<AvailableEnvironmentSection, ReducerEnvironmentDto>

export function controlEnvironment(environment: ReducerEnvironmentDto) {
  return { type: CONTROL_ENVIRONMENT, environment }
}

export interface actionTypes {
  type: "CONTROL_ENVIRONMENT";
  environment: ReducerEnvironmentDto;
}

const {defaultEnvironment} = require('../../values/defaults');
const initialState: ReducerEnvironmentState =
  loadState(StorageKeys.ENVIRONMENTS)
  || {
    'd1': defaultEnvironment,
    'd2': defaultEnvironment,
    'd3': defaultEnvironment,
  }

function ControlEnvironment(
  state =initialState, action: actionTypes
): ReducerEnvironmentState {
  switch(action.type){
    case CONTROL_ENVIRONMENT:
      const environment = action.environment;
      return update(state, {
        [environment.environmentSection]: { $set: environment }
      });

    default:
      return state
  }
}

export default ControlEnvironment;