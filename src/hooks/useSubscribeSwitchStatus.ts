import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../constants";
import {AvailableMachines} from "@interfaces/main";
import {ReducerSwitchState} from "@redux/modules/ControlSwitch";

export default function useSubscribeSwitchStatus(
  machine?: AvailableMachines
): boolean | ReducerSwitchState {
  if (machine) {
    return useSelector((state: RootState) =>
      state[StorageKeys.SWITCHES][machine], shallowEqual
    )
  } else {
    return useSelector((state: RootState) =>
      state[StorageKeys.SWITCHES], shallowEqual
    )
  }
}