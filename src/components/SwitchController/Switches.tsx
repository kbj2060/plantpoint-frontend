import React, {BaseSyntheticEvent, memo, useCallback, useEffect} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import {CustomIOSSwitch} from "@compUtils/CustomIOSSwitch";
import {ReducerControlSwitchesDto} from "@redux/modules/ControlSwitch"
import '@styles/components/switch_controller.scss';
import {CreateSwitchDto} from "@interfaces/Switch";
import {MachineProps} from "@interfaces/main";
import {HttpUrls, StorageKeys, Reports, Errors, WebSocketEvent} from "../../constants";
import {getReduxData} from "@funcUtils/getReduxData";
import useChangeSwitchStatus from "@hooks/useChangeSwitchStatus";
import {currentPage} from "@funcUtils/currentPage";
import {currentUser} from "@funcUtils/currentUser";
import socket from "../../socket";
import { StatusConverter } from '@interfaces/StatusConverter.class';
import useSubscribeSwitchStatus from "@hooks/useSubscribeSwitchStatus";

interface SwitchesProps extends MachineProps {}
function Switches({machine}: SwitchesProps) {
  const machineSection = currentPage();
  const state = useSubscribeSwitchStatus(machine) as boolean;
  const changeSwitchStatus = useChangeSwitchStatus();

  const postSwitchMachine = async <T extends boolean> ( status: T ) => {
    await axios.post(HttpUrls.SWITCHES_CREATE, {
      machine : machine,
      machineSection : machineSection,
      status : new StatusConverter(status).toDatabaseStatus(),
      controlledBy : currentUser() as string,
    } as CreateSwitchDto);
  }

  function handleChange <T extends BaseSyntheticEvent> ( e: T ) {
    e.persist();
    const status: boolean = new StatusConverter(e.target.checked).toSwitchStatus();
    const dto: ReducerControlSwitchesDto = {
      machineSection: machineSection,
      machine: machine as string,
      status: status,
    }

    if ((machine === "cooler" && status && getReduxData(StorageKeys.SWITCHES)['heater'])
      || (machine === "heater" && status && getReduxData(StorageKeys.SWITCHES)['cooler'])) {
      return;
    }

    changeSwitchStatus( dto );
    socket.emit(WebSocketEvent.SEND_SWITCH_TO_SERVER, dto);
    postSwitchMachine( status )
      .then(()=> { console.log(Reports.SWITCH_CHANGED); })
      .catch(() => { console.log(Errors.POST_SWITCH_FAILURE); })
  }

  const cleanup = () => {
    socket.disconnect();
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
    socket.on(WebSocketEvent.SEND_SWITCH_TO_CLIENT,  (dto: ReducerControlSwitchesDto) => {
      if( machine === dto.machine && machineSection === dto.machineSection ){
        const convertedStatus: boolean = new StatusConverter(dto.status).toSwitchStatus()
        if (getReduxData(StorageKeys.SWITCHES)[machine] !== convertedStatus){
          changeSwitchStatus(dto);
        }
      }
    })
    return () => {
      cleanup();
    }
  }, [machine, changeSwitchStatus, machineSection]);

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