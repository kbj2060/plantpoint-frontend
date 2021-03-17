import {loadState, saveState} from "@components/LocalStorage";
import {StorageKeys} from "../../reference/constants";
import update from "immutability-helper";

const CONTROL_ENVIRONMENT = "CONTROL_ENVIRONMENT";
const SAVE_ENVIRONMENT = "SAVE_ENVIRONMENT";

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

export function saveEnvironment(environment: ReducerEnvironmentState) {
  return { type: CONTROL_ENVIRONMENT, environment }
}

export interface actionTypes {
  type: "CONTROL_ENVIRONMENT" | "SAVE_ENVIRONMENT";
  environment: ReducerEnvironmentDto | ReducerEnvironmentState;
}

const initialState: ReducerEnvironmentState = loadState(StorageKeys.ENVIRONMENTS) || {}

function ControlEnvironment(
  state =initialState, action: actionTypes
): ReducerEnvironmentState {
  switch(action.type){
    case CONTROL_ENVIRONMENT:
      const environment = action.environment as ReducerEnvironmentDto;
      const updated: ReducerEnvironmentState = update(state, {
        [ environment.environmentSection ]: { $set: environment }
      })
      saveState(StorageKeys.ENVIRONMENTS, updated)
      return updated;

    case SAVE_ENVIRONMENT:
      return action.environment as ReducerEnvironmentState;

    default:
      return state
  }
}

export default ControlEnvironment;