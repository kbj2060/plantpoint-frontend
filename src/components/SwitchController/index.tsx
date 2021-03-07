import React from 'react';
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Switch from "./Switches";
import IconWrapper from "./IconWrapper";
import AutomationChecker from "./AutomationChecker";
import SettingModal from "../SettingModal";
import {getReduxData} from "@funcUtils/getReduxData";
import {StorageKeys} from "../../constants";
import {MachineProps} from "@interfaces/main";
import {AvailableMachines} from "@interfaces/main";
import CurrentChecker from "@components/SwitchController/CurrentChecker";
import '@styles/components/switch_controller.scss';
import {checkLogin} from "@funcUtils/checkLogin";
import {Redirect} from "react-router-dom";

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
    <Box className='checkers' flexGrow={1} p={1} >
      <CurrentChecker machine={machine}/>
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
  const machines = Object.keys(getReduxData(StorageKeys.SWITCHES)).sort();

  const SwitchesWrapper = () => {
    return (
      <>
      {machines.map(machine =>
        <Box key={machine.toString()} display='flex'>
          <Icons machine={machine as AvailableMachines} />
          <Checkers machine={machine as AvailableMachines}/>
          <PowerSwitch machine={machine as AvailableMachines}/>
        </Box>)}
      </>
    )
  }

  const SettingModalWrapper = () => {
    return (
      <Box className='modal-button-box'>
       <SettingModal />
      </Box>
    )
  }

  return (
    !checkLogin()
      ? <Redirect to='/'/>
      : <Card className='switch-controllers' >
          <SwitchesWrapper />
          <SettingModalWrapper />
        </Card>
  );
}
