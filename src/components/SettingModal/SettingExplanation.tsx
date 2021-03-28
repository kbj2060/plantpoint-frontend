import React, {useEffect} from 'react';
import Chip from '@material-ui/core/Chip';
import {checkEmpty} from '@funcUtils/checkEmpty';
import {getReduxData} from "@funcUtils/getReduxData";
import {groupBy} from "@funcUtils/groupBy";
import {StorageKeys} from "../../reference/constants";
import {ReducerAutomationState, saveAutomation} from "@redux/modules/ControlAutomation";
import {useDispatch} from "react-redux";
import {currentPage} from "@funcUtils/currentPage";
import {CoolerExplanationChip, CycleExplanationChip, RangeExplanationChip} from "@interfaces/ExplanationChip.class";
import {Loader} from "@compUtils/Loader";
import {getAutomation} from "../../handler/httpHandler";
import { Machines } from '../../reference/machines';

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

  function getCycleChips<T extends string> (machine: T): JSX.Element[] {
    const {start, end, term} = automations[machine];
    return new CycleExplanationChip( start, end, term ).explanation();
  }

  function getRangeChips <T extends string> (machine: T): JSX.Element {
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
      </tbody>
    </table>
  )
}
