import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../constants";
import {AvailableMachines} from "@interfaces/main";

export default function useSubscribeSwitchStatus(
  machine: AvailableMachines
): boolean {
    return useSelector((state: RootState) =>
      state[StorageKeys.SWITCHES][machine], shallowEqual
    )
}