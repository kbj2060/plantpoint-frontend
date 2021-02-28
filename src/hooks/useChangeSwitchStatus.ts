import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {controlSwitch, ReducerControlSwitchesDto} from "@redux/modules/ControlSwitch";

export default function useChangeSwitchStatus () {
  const dispatch = useDispatch();
  return useCallback((_switch: ReducerControlSwitchesDto) => {
    dispatch(controlSwitch(_switch));
  }, [dispatch] );
};