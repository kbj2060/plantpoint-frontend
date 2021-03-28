import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../reference/constants";


export default function useSubscribeSwitchStatus(
  machine: string
): boolean {
    return useSelector((state: RootState) => state[StorageKeys.SWITCHES][machine], shallowEqual )
}