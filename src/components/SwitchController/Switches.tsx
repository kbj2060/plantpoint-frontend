import React, {useEffect} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import {useDispatch} from "react-redux";
import {controlSwitch} from "../../redux/modules/ControlSwitch";
//import socket from '../../socket';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
//import {CheckLogin} from "../utils/CheckLogin";
import {CustomIOSSwitch} from "../utils/customIOSSwitch";
import {ColorCircularProgress} from "../utils/colorCircularProgress";
import {store} from "../../redux/store";
//import getCurrentUser from "../utils/getCurrentUser";
import '../../styles/components/switch_controller.scss';
import getCurrentUser from "../../utils/getCurrentUser";
import {CreateSwitchDto, DispatchControlSwitchDto, MachineProps} from "../../interfaces/ISwitch";
import {HttpUrls, LocalStorageKeys, Reports} from "../../constants";
import {AvailableMachines, AvailableMachineSection} from "../../interfaces/main";

interface switchesProps extends MachineProps {}
function Switches({machine}: switchesProps) {
  const [state, setState] = React.useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const {Translations} = require('../..//values/translations');
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
    const currentSwitches = store.getState()[LocalStorageKeys.SWITCHES][current_page];
    const dispatchControlSwitch: DispatchControlSwitchDto = {
      machineSection: current_page as AvailableMachineSection,
      machine: machine as AvailableMachines,
      status: status,
    }

    if ((machine === "cooler" && status && currentSwitches['heater'])
      || (machine === "heater" && status && currentSwitches['cooler'])) {
      return;
    }

    dispatch( controlSwitch( dispatchControlSwitch ) );
    openSnackBar();
    setState( status );
    //emitSocket(status);
    postSwitchMachine( status ).then(() => Reports.SWITCH_CHANGED)
  }

  const openSnackBar = () => {
    setSnackbarOpen(true);
  }

  const closeSnackBar = () => {
    setSnackbarOpen(false);
  }

  const cleanup = () => {
    //socket.disconnect();
    setIsLoading(true);
  }

  function getMemorizedMachineState (): boolean {
    return store.getState()[LocalStorageKeys.SWITCHES][current_page][machine]
  }

  const PowerDisplay = () => {
    return (
      state
        ? <p className='display-power-on'>ON</p>
        : <p className='display-power-off'>OFF</p>
    )
  }

  const Alarm = () => {
    return (
      <Snackbar open={snackbarOpen} onClose={closeSnackBar} autoHideDuration={2000}>
        <MuiAlert elevation={6} variant="filled" onClose={closeSnackBar} severity="info">
          {`${Translations[machine.toLowerCase()]} 전원 수동 전환 완료!`}
        </MuiAlert>
      </Snackbar>
    )
  }

  useEffect(() => {
    setState( getMemorizedMachineState() )
    setIsLoading(false)
    //receiveSocket();
    return () => {
      cleanup();
    }
  }, [machine]);

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
      <Alarm />
    </>
  )
}

export default Switches;