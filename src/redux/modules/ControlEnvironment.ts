import {loadState, saveState} from "@components/LocalStorage";
import {StorageKeys} from "../../reference/constants";
import update from "immutability-helper";
import {groupBy} from "@funcUtils/groupBy";

const CONTROL_ENVIRONMENT = "CONTROL_ENVIRONMENT";
const SAVE_ENVIRONMENT = "SAVE_ENVIRONMENT";

export interface ReducerEnvironmentDto {
  section : string;
  co2: number;
  humidity: number;
  temperature: number;
}

export type ReducerEnvironmentState = Record<string, ReducerEnvironmentDto>

export function controlEnvironment(environment: ReducerEnvironmentDto) {
  return { type: CONTROL_ENVIRONMENT, environment }
}

export function saveEnvironment(environment: ReducerEnvironmentDto[]) {
  return { type: SAVE_ENVIRONMENT, environment }
}

export interface actionTypes {
  type: "CONTROL_ENVIRONMENT" | "SAVE_ENVIRONMENT";
  environment: ReducerEnvironmentDto | ReducerEnvironmentDto[];
}

const initialState: ReducerEnvironmentState = loadState(StorageKeys.ENVIRONMENTS) || {}

function ControlEnvironment(
  state =initialState, action: actionTypes
) {
  switch(action.type)
  {
    case CONTROL_ENVIRONMENT:
      const environment = action.environment as ReducerEnvironmentDto;
      const updated: ReducerEnvironmentState = update(state, {
        [ environment.section ]: { $set: environment }
      })
      saveState(StorageKeys.ENVIRONMENTS, updated)
      return updated;

    case SAVE_ENVIRONMENT:
      const environments = action.environment as ReducerEnvironmentDto[];
      return groupBy(environments, 'section')

    default:
      return state
  }
}

export default ControlEnvironment;