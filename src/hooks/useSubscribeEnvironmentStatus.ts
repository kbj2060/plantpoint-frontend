import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../constants";
import {ReducerEnvironmentDto} from "@redux/modules/ControlEnvironment";

export default function useSubscribeEnvironmentStatus(
  environmentSection: string,
  environmentName: string,
) {
  return useSelector((state: RootState) =>
    state[StorageKeys.ENVIRONMENTS][environmentSection][environmentName as keyof ReducerEnvironmentDto], shallowEqual
  )
}