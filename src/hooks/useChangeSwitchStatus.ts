import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {controlSwitch, ReducerControlSwitchDto} from "@redux/modules/ControlSwitch";

export default function useChangeSwitchStatus () {
  const dispatch = useDispatch();
  return useCallback((_switch: ReducerControlSwitchDto) => {
    dispatch(controlSwitch(_switch));
  }, [dispatch] );
};