import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../constants";
import {AvailableEnvironment, AvailableEnvironmentSection} from "@interfaces/main";

export default function useSubscribeEnvironmentStatus(
  environmentSection: AvailableEnvironmentSection,
  environmentName: AvailableEnvironment,
) {
  return useSelector((state: RootState) =>
    state[StorageKeys.ENVIRONMENTS][environmentSection][environmentName], shallowEqual
  )
}