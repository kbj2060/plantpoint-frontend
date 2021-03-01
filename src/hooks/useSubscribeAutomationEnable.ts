import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from "@redux/modules";
import {StorageKeys} from "../constants";
import {AvailableMachines} from "@interfaces/main";

export default function useSubscribeAutomationEnable(machine: AvailableMachines) {
  return useSelector((state: RootState) =>
      state[StorageKeys.AUTO][machine].enable, shallowEqual
  )
}