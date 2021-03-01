import React, {BaseSyntheticEvent, memo, useCallback, useEffect} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import {CustomIOSSwitch} from "@compUtils/CustomIOSSwitch";
import {ReducerControlSwitchesDto} from "@redux/modules/ControlSwitch"
import '@styles/components/switch_controller.scss';
import {CreateSwitchDto} from "@interfaces/Switch";
import {MachineProps} from "@interfaces/main";
import {HttpUrls, StorageKeys, Reports, Errors} from "../../constants";
import {AvailableMachines, AvailableMachineSection} from "@interfaces/main";
import {getReduxData} from "@funcUtils/getReduxData";
//import socket from '../../socket';
import useChangeSwitchStatus from "@hooks/useChangeSwitchStatus";
import {currentPage} from "@funcUtils/currentPage";
import {currentUser} from "@funcUtils/currentUser";

interface SwitchesProps extends MachineProps {}
function Switches({machine}: SwitchesProps) {
  const machineSection = currentPage();
  const [state, setState] = React.useState<boolean>(getReduxData(StorageKeys.SWITCHES)[machine]);
  const changeSwitchStatus = useChangeSwitchStatus();

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

  const postSwitchMachine = async <T extends boolean> (status: T) => {
    const convertedStatus: number = status? 1 : 0;
    const username = currentUser() as string;
    const dto: CreateSwitchDto = {
      machine : machine,
      machineSection : machineSection as AvailableMachineSection,
      status : convertedStatus,
      controlledBy : username,
    };
    await axios.post(HttpUrls.SWITCHES_CREATE, dto);
  }

  function handleChange<T extends BaseSyntheticEvent>(e: T) {
    e.persist();
    const status: boolean = e.target.checked;
    const dto: ReducerControlSwitchesDto = {
      machineSection: machineSection as AvailableMachineSection,
      machine: machine as AvailableMachines,
      status: status,
    }

    if ((machine === "cooler" && status && getReduxData(StorageKeys.SWITCHES)['heater'])
      || (machine === "heater" && status && getReduxData(StorageKeys.SWITCHES)['cooler'])) {
      return;
    }

    changeSwitchStatus( dto );
    setState( status );
    //emitSocket(status);
    postSwitchMachine( status )
      .then(()=> { console.log(Reports.SWITCH_CHANGED); })
      .catch(() => { console.log(Errors.POST_SWITCH_FAILURE); })
  }

  const cleanup = () => {
    //socket.disconnect();
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
    //receiveSocket();
    return () => {
      cleanup();
    }
  }, [machine]);

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