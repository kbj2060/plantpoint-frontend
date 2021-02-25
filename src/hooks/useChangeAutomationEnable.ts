import {controlAutomation, ReducerAutomationDto} from "../redux/modules/ControlAutomation";
import update from "immutability-helper";
import {useDispatch} from "react-redux";
import {useCallback} from "react";

export default function useChangeAutomationEnable () {
  const dispatch = useDispatch();
  return useCallback((singleAutomation: ReducerAutomationDto, updatedStatus: boolean) =>
      dispatch(controlAutomation(
        update( singleAutomation, { enable: { $set: updatedStatus } } )
      )), [dispatch] );
};