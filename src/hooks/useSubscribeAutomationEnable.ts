import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../reference/constants";


export default function useSubscribeAutomationEnable(machine: string) {
  return useSelector((state: RootState) =>
      state[StorageKeys.AUTO][machine].enable, shallowEqual
  )
}