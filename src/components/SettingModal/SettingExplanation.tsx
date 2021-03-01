import React, {useCallback, useEffect} from 'react';
import axios from 'axios';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ToysIcon from '@material-ui/icons/Toys';
import OpacityIcon from '@material-ui/icons/Opacity';
import Chip from '@material-ui/core/Chip';
import LoopIcon from '@material-ui/icons/Loop';
import {ColorCircularProgress} from "@compUtils/ColorCircularProgress";
import {checkEmpty} from '@funcUtils/checkEmpty';
import {getReduxData} from "@funcUtils/getReduxData";
import {groupBy} from "@funcUtils/groupBy";
import {HttpUrls, StorageKeys} from "../../constants";
import {ReducerAutomationState, saveAutomation} from "@redux/modules/ControlAutomation";
import {useDispatch} from "react-redux";
import {AvailableMachines} from "@interfaces/main";
import {currentPage} from "@funcUtils/currentPage";

interface SettingExplanationProps {
  position: string,
}

export default function SettingExplanation({position}: SettingExplanationProps) {
  const machineSection = currentPage();
  const [automations, setAutomations] = React.useState<ReducerAutomationState>(getReduxData(StorageKeys.AUTO));
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  // TODO : 리덕스에서 그냥 꺼내쓰는 것과 디비에서 꺼내 쓰는 것 비교해보기.
  const getDatabaseAutomation = useCallback(async () => {
    await axios.get(`${HttpUrls.AUTOMATION_READ}/${machineSection}`)
      .then(({data}) => {
        const {lastAutomations} = data;
        const grouped: ReducerAutomationState = groupBy(lastAutomations, 'machine');
        dispatch(saveAutomation(grouped));
      })
      .then(() => {
        setAutomations(getReduxData(StorageKeys.AUTO));
        setIsLoaded(true);
      })
  }, [dispatch, machineSection]);

  // TAIL(현재 설정) 데이터 보여주기 함수
  const getReduxAutomation = () => {
    setAutomations(getReduxData(StorageKeys.AUTO));
    setIsLoaded(true);
  }

  function getAutoEnable<T extends AvailableMachines>(subject: T) {
    if(!checkEmpty(subject)){
      return automations[subject].enable;
    }
  }

  const getOffChips = () => {
    return (<Chip key={'off'} className='chip' variant="outlined" size="small" label={"자동화 꺼짐"} /> )
  }

  function getCycleChips<T extends AvailableMachines> (subject: T) {
    if(!checkEmpty(automations[subject])){
      let {start, end, term} = automations[subject];
      let result = [];
      result.push(<Chip key={'loop'} className='chip' icon={<LoopIcon className='chip'/>} variant="outlined" size="small" label={`${term} 일`} />)
      start.forEach((s, i) => {
        const label = `${s} - ${end[i]}`;
        result.push(<Chip key={label} className='chip' variant="outlined" size="small" label={label} />);
      });
      return result;
    }
  }

  const getLEDChips= () => {
    const _min = automations.led.start[0], _max = automations.led.end[0];
    return (
      <>
        <Chip className='chip' variant="outlined" size="small" label={`${_min}시 켜기`} />
        <Chip className='chip' variant="outlined" size="small" label={`${_max}시 끄기`} />
      </>
    )
  }

  const getCoolerChips = () => {
    const _min = automations.heater.start[0], _max = automations.heater.end[0];
    return (
        <>
          <Chip className='chip' variant="outlined" size="small" label={`${_min}°C 냉방 끄기`} />
          <Chip className='chip' variant="outlined" size="small" label={`${_max}°C 냉방 켜기`} />
        </>
    )
  }

  const getHeaterChips = () => {
    const _min = automations.heater.start[0], _max = automations.heater.end[0];
    return (
      <>
        <Chip className='chip' variant="outlined" size="small" label={`${_min}°C 난방 켜기`}/>
        <Chip className='chip' variant="outlined" size="small" label={`${_max}°C 난방 끄기`}/>
      </>
    )
  }

  useEffect(() => {
    position === 'head'
      ? getDatabaseAutomation()
      : getReduxAutomation()
    return () => {
      setIsLoaded(false);
    }
  }, [position, getDatabaseAutomation])

  return(
  !isLoaded
    ? <ColorCircularProgress />
    : <table className='table'>
      <tbody>
      <tr className='cell'>
        <td className='icon'>
          <WbSunnyIcon className='default-icon' />
        </td>
        <td className='center-icon'>
            {!getAutoEnable('led') ? getOffChips() : getLEDChips()}
        </td>
      </tr>
      <tr className='cell'>
        <td className='icon'>
          <WhatshotIcon className='default-icon' />
        </td>
        <td className='center-icon'>
            {!getAutoEnable('heater') ? getOffChips() : getHeaterChips()}
        </td>
      </tr>
      <tr className='cell'>
        <td className='icon'>
          <AcUnitIcon className='default-icon' />
        </td>
        <td className='center-icon'>
          {!getAutoEnable('cooler') ? getOffChips() : getCoolerChips()}
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
      </tbody>
    </table>
  )
}
