import React, {BaseSyntheticEvent} from 'react';
import Grid from "@material-ui/core/Grid";
import {CustomAntSwitch} from "@compUtils/CustomAntSwitch";
import { ReducerAutomationDto } from "@redux/modules/ControlAutomation";
import {StorageKeys} from "../../constants";
import {getReduxData} from "@funcUtils/getReduxData";
import '@styles/components/automation_content.scss';
import {MachineProps} from "@interfaces/main";
import useChangeAutomationEnable from "@hooks/useChangeAutomationEnable";

interface AutoSwitchWrapperProps extends MachineProps {}
export default function AutoSwitchWrapper({machine}: AutoSwitchWrapperProps) {
  const singleAutomation: ReducerAutomationDto = getReduxData(StorageKeys.AUTO)[machine];
  const [status, setStatus] = React.useState(singleAutomation.enable);
  const changeAutomationEnable = useChangeAutomationEnable();

  function handleChange <T extends BaseSyntheticEvent> (event: T){
    const singleAutomation: ReducerAutomationDto = getReduxData(StorageKeys.AUTO)[machine];
    const updatedStatus = event.target.checked;
    changeAutomationEnable(singleAutomation, updatedStatus);
    setStatus(updatedStatus);
  }

  return(
    <Grid container>
      <Grid item className='auto-switch'>
        <CustomAntSwitch checked={status}
                         onChange={handleChange}
                         value={machine}
                         name={machine}/>
      </Grid>
    </Grid>
  )
}