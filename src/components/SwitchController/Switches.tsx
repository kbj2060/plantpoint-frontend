import React, {memo, useCallback, useEffect} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import {CustomIOSSwitch} from "../utils/customIOSSwitch";
import {ColorCircularProgress} from "../utils/colorCircularProgress";
import {ReducerControlSwitchDto} from "@redux/modules/ControlSwitch"
import {store} from "@redux/store";
import '@styles/components/switch_controller.scss';
import getCurrentUser from "../../utils/getCurrentUser";
import {CreateSwitchDto, MachineProps} from "@interfaces/Switch";
import {HttpUrls, StorageKeys, Reports} from "../../constants";
import {AvailableMachines, AvailableMachineSection} from "@interfaces/main";
import {getReduxData} from "@funcUtils/getReduxData";
//import socket from '../../socket';
//import {CheckLogin} from "../utils/CheckLogin";
//import getCurrentUser from "../utils/getCurrentUser";
import useChangeSwitchStatus from "@hooks/useChangeSwitchStatus";

interface switchesProps extends MachineProps {}
function Switches({machine}: switchesProps) {
  const [state, setState] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const changeSwitchStatus = useChangeSwitchStatus();
  const current_page = decodeURI(window.location.pathname.replace('/',''))

  /*const emitSocket = (status) => {
    socket.emit('sendSwitchControl', {
      machine : machine,
      status : status
    })
  }

  const receiveSocket = () => {
    socket.on('receiveSwitchControl', (switchStatus) => {
      if(machine === switchStatus.machine){
        console.log(switchStatus)
        setState({[machine] : switchStatus.status});
        const _switch = store.getState()['switches'][machine];
        if (_switch !== switchStatus.status){dispatch(controlSwitch({[machine] : switchStatus.status}));}
      }})
  }*/

  const postSwitchMachine = async (status: boolean) => {
    const convertedStatus: number = status? 1 : 0;
    const switchCreateDto: CreateSwitchDto = {
      machine : machine,
      machineSection : current_page as AvailableMachineSection,
      status : convertedStatus,
      controlledBy : getCurrentUser(),
    }
    await axios.post(HttpUrls.SWITCHES_CREATE, switchCreateDto)
  }

  const handleChange = (e: { persist: () => void; target: { checked: any; }; }) => {
    e.persist();
    const status: boolean = e.target.checked;
    const currentSwitches = store.getState()[StorageKeys.SWITCHES];
    const dispatchControlSwitch: ReducerControlSwitchDto = {
      machineSection: current_page as AvailableMachineSection,
      machine: machine as AvailableMachines,
      status: status,
    }

    if ((machine === "cooler" && status && currentSwitches['heater'])
      || (machine === "heater" && status && currentSwitches['cooler'])) {
      return;
    }

    changeSwitchStatus( dispatchControlSwitch );
    setState( status );
    //emitSocket(status);
    postSwitchMachine( status ).then(() => Reports.SWITCH_CHANGED)
  }

  const cleanup = () => {
    //socket.disconnect();
    setIsLoading(true);
  }

  const getMemorizedMachineState = useCallback(() => {
    return getReduxData(StorageKeys.SWITCHES)[machine];
  }, [machine])

  const PowerDisplay = () => {
    return (
      state
        ? <p className='display-power-on'>ON</p>
        : <p className='display-power-off'>OFF</p>
    )
  }

  useEffect(() => {
    setState( getMemorizedMachineState() )
    setIsLoading(false)
    //receiveSocket();
    return () => {
      cleanup();
    }
  }, [machine, getMemorizedMachineState]);

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    <>
      <FormGroup >
        <FormControlLabel
          label={''}
          control={
            <CustomIOSSwitch
              checked={state || getMemorizedMachineState()}
              key={machine}
              onChange={handleChange}
              value={machine} />
              }
          className='control-form' />
      </FormGroup>
      <PowerDisplay />
    </>
  )
}

export default memo(Switches);