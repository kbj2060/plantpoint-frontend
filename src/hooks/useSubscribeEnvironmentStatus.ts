import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../reference/constants";
import {ReducerEnvironmentDto} from "@redux/modules/ControlEnvironment";

export default function useSubscribeEnvironmentStatus(
  section: string,
  name: string,
) {
  return useSelector((state: RootState) =>
    state[StorageKeys.ENVIRONMENTS][section][name as keyof ReducerEnvironmentDto], shallowEqual
  )
}