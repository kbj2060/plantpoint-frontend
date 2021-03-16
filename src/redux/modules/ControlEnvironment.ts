import {loadState} from "@components/LocalStorage";
import {StorageKeys} from "../../constants";
import update from "immutability-helper";

const CONTROL_ENVIRONMENT = "CONTROL_ENVIRONMENT";

export interface ReducerEnvironmentDto {
  environmentSection : string;
  co2: number;
  humidity: number;
  temperature: number;
}

export type ReducerEnvironmentState = Record<string, ReducerEnvironmentDto>

export function controlEnvironment(environment: ReducerEnvironmentDto) {
  return { type: CONTROL_ENVIRONMENT, environment }
}

export interface actionTypes {
  type: "CONTROL_ENVIRONMENT";
  environment: ReducerEnvironmentDto;
}

const initialState: ReducerEnvironmentState = loadState(StorageKeys.ENVIRONMENTS) || {}

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