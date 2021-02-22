import React from 'react';
import Box from "@material-ui/core/Box";
import Switch from "./Switches";
import Card from "@material-ui/core/Card";
import IconWrapper from "./IconWrapper";
import AutoChecker from "./AutomationChecker"
import {store} from "../../redux/store";
import {LocalStorageKeys} from "../../constants";
import {MachineProps} from "../../interfaces/ISwitch";
import '../../styles/components/switch_controller.scss';
import {AvailableMachines} from "../../interfaces/main";
import AutomationChecker from "./AutomationChecker";
//import CurrentChecker from './CurrentChecker';
//import SettingModal from "../SettingModal";

interface IconsProps extends MachineProps {}
const Icons = ({machine}: IconsProps) => {
  return (
    <Box className='icons' flexGrow={1} p={1} >
      <IconWrapper key={machine} machine={machine} />
    </Box>
  )
}

interface CheckersProps extends MachineProps {}
const Checkers = ({machine}: CheckersProps) => {
  return (
    <Box className='checker' flexGrow={1} p={1} >
      {/*<CurrentChecker machine={machine}/>*/}
      <AutomationChecker machine={machine} />
    </Box>
  )
}

interface PowerSwitchProps extends MachineProps {}
const PowerSwitch = ({machine}: PowerSwitchProps) => {
  return (
    <Box className='power-button' p={1} flexGrow={1}>
      <Switch key={machine} machine={machine} />
    </Box>
  )
}

export default function SwitchController() {
  const current_page: string = decodeURI(window.location.pathname.replace('/',''))
  const machines = Object.keys(store.getState()[LocalStorageKeys.SWITCHES][current_page]);

  const SwitchesWrapper = () => {
    return (
      <>
      {machines.map(machine =>
        <Box key={machine.toString()} className='switch-wrapper' display='flex'>
          <Icons machine={machine as AvailableMachines} />
          <Checkers machine={machine as AvailableMachines}/>
          <PowerSwitch machine={machine as AvailableMachines}/>
        </Box>)}
      </>
    )
  }

/*  const SettingModalWrapper = () => {
    return (
      <Box style={{textAlign:'center'}}>
       {/!*<SettingModal />*!/}
      </Box>
    )
  }*/

  return (
    <Card className='switch-controllers' >
        <SwitchesWrapper />
        {/*<SettingModalWrapper />*/}
    </Card>
  );
}
