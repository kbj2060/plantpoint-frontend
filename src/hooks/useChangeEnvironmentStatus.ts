import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {controlEnvironment, ReducerEnvironmentDto} from "@redux/modules/ControlEnvironment";

export default function useChangeEnvironmentStatus () {
  const dispatch = useDispatch();
  return useCallback((environment: ReducerEnvironmentDto) => {
    dispatch(controlEnvironment(environment));
  }, [dispatch] );
};