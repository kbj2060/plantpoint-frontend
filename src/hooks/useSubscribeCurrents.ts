import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../reference/constants";
import { ReducerCurrentState } from '@redux/modules/ControlCurrent';

export default function useSubscribeCurrents(machine: string): number {
    return useSelector((state: RootState) =>
      state[StorageKeys.CURRENT][machine], shallowEqual
    )
}