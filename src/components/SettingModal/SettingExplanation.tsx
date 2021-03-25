import React, {useEffect} from 'react';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ToysIcon from '@material-ui/icons/Toys';
import OpacityIcon from '@material-ui/icons/Opacity';
import Chip from '@material-ui/core/Chip';
import {checkEmpty} from '@funcUtils/checkEmpty';
import {getReduxData} from "@funcUtils/getReduxData";
import {groupBy} from "@funcUtils/groupBy";
import {StorageKeys} from "../../reference/constants";
import {ReducerAutomationState, saveAutomation} from "@redux/modules/ControlAutomation";
import {useDispatch} from "react-redux";

import {currentPage} from "@funcUtils/currentPage";
import RoofFanIcon from "../../assets/icons/RoofFanIcon";
import {CoolerExplanationChip, CycleExplanationChip, RangeExplanationChip} from "@interfaces/ExplanationChip.class";
import {Loader} from "@compUtils/Loader";
import {getAutomation} from "../../handler/httpHandler";
import { EmptyMachine, Machines } from '../../reference/machines';
import { BaseMachine, CycleMachine, RangeMachine, TemperatureRangeMachine } from '../../interfaces/Machine.class';

interface SettingExplanationProps {
  position: string,
}

export default function SettingExplanation({position}: SettingExplanationProps) {
  const [automations, setAutomations] = React.useState<ReducerAutomationState>(getReduxData(StorageKeys.AUTO));
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  // TAIL(현재 설정) 데이터 보여주기 함수
  const getReduxAutomation = () => {
    setAutomations(getReduxData(StorageKeys.AUTO));
    setIsLoaded(true);
  }

  function getAutoEnable<T extends string>(subject: T) {
    if(!checkEmpty(subject)){
      return automations[subject].enable;
    }
  }

  const getOffChips = () => {
    return (<Chip key={'off'} className='chip' variant="outlined" size="small" label={"자동화 꺼짐"} /> )
  }

  function getCycleChips<T extends string> (machine: T) {
    const {start, end, term} = automations[machine];
    return new CycleExplanationChip( start, end, term ).explanation();
  }

  function getRangeChips <T extends string> (machine: T) {
    return new RangeExplanationChip( machine, [ automations[machine].start[0], automations[machine].end[0] ] ).isCoolerException() 
            ? new CoolerExplanationChip(
              machine,[ automations[machine].start[0], automations[machine].end[0] ]
            ).explanation()
            : new RangeExplanationChip(
              machine,[ automations[machine].start[0], automations[machine].end[0] ]
            ).explanation()
  }

  function Explanation (): JSX.Element {
    const elements: JSX.Element[] = ( new Machines().getMachines() ).map((machineClass: any ) => {
      const machine = new machineClass();
      return (
        <tr key={machine.name} className='cell'>
          <td className='icon'>
            {machine.getIcon()}
          </td>
          <td className='center-icon'>
              {!getAutoEnable(machine.name) 
                  ? getOffChips() 
                  : machine.isCycleMachineType() 
                    ? getCycleChips(machine.name)
                    : getRangeChips(machine.name)
                  }
          </td>
        </tr>
      )
    })
    return (
      <React.Fragment>
        {elements}
      </React.Fragment>
    )
  }

  useEffect(() => {
    const getDatabaseAutomation = async () => {
      const machineSection = currentPage();
      getAutomation(machineSection)
        .then(({data}) => {
          const {lastAutomations} = data;
          const grouped: ReducerAutomationState = groupBy(lastAutomations, 'machine');
          dispatch( saveAutomation( grouped ) );
        })
        .then(() => {
          setAutomations(getReduxData(StorageKeys.AUTO));
          setIsLoaded(true);
        })
    }

    position === 'head'
      ? getDatabaseAutomation()
      : getReduxAutomation()

    return () => {
      setIsLoaded(false);
    }
  }, [ position, dispatch ])

  return(
  !isLoaded
    ? <Loader />
    : <table className='table'>
      <tbody>
      <Explanation />
      {/* <tr className='cell'>
        <td className='icon'>
          <WbSunnyIcon className='default-icon' />
        </td>
        <td className='center-icon'>
            {!getAutoEnable('led') ? getOffChips() : getRangeChips('led')}
        </td>
      </tr>
      <tr className='cell'>
        <td className='icon'>
          <WhatshotIcon className='default-icon' />
        </td>
        <td className='center-icon'>
            {!getAutoEnable('heater') ? getOffChips() : getRangeChips('heater')}
        </td>
      </tr>
      <tr className='cell'>
        <td className='icon'>
          <AcUnitIcon className='default-icon' />
        </td>
        <td className='center-icon'>
          {!getAutoEnable('cooler') ? getOffChips() : getRangeChips('cooler')}
        </td>
      </tr>
      <tr className='cell'>
        <td className='icon'>
          <ToysIcon className='default-icon' />
        </td>
        <td className='center-icon'>
            {!getAutoEnable('fan') ? getOffChips() : getCycleChips('fan')}
        </td>
      </tr>
      <tr className='cell'>
        <td className='icon'>
          <OpacityIcon className='default-icon' />
        </td>
        <td className='center-icon'>
            {!getAutoEnable('waterpump') ? getOffChips() : getCycleChips('waterpump')}
        </td>
      </tr>
      <tr className='cell'>
        <td className='icon'>
          <RoofFanIcon className='default-icon' />
        </td>
        <td className='center-icon'>
          {!getAutoEnable('roofFan') ? getOffChips() : getCycleChips('roofFan')}
        </td>
      </tr> */}
      </tbody>
    </table>
  )
}
