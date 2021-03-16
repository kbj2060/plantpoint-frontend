import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../reference/constants";
import {ReducerSwitchState} from "@redux/modules/ControlSwitch";

export default function useSubscribeSwitches(
): ReducerSwitchState {
    return useSelector((state: RootState) =>
      state[StorageKeys.SWITCHES], shallowEqual
    )
}