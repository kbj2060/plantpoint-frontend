import React, {useImperativeHandle} from 'react';
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {controlAutomation} from "@redux/modules/ControlAutomation";
import {useDispatch} from "react-redux";
import {store} from "@redux/store";
import update from 'immutability-helper';
import {StorageKeys} from "../../constants";
import {getReduxData} from "@funcUtils/getReduxData";
import {ReducerAutomationDto} from "@redux/modules/ControlAutomation";
import {AvailableMachines} from "@interfaces/main";
import {TaskNextButtonRef} from "@components/SettingModal/CustomStepper";

interface TermControlButtonProp {
  machine: AvailableMachines;
}

const TermControlButton = React.forwardRef((
    {machine}: TermControlButtonProp, ref?: React.Ref<TaskNextButtonRef>
  ) => {
  const dispatch = useDispatch();
  const singleAutomation: ReducerAutomationDto = getReduxData( StorageKeys.AUTO )[ machine ]
  const [term, setTerm] = React.useState<number>( singleAutomation.term );

  useImperativeHandle(ref, () => ({
    handleNextStep () {
      dispatch(controlAutomation(update(singleAutomation, {
        term: { $set: term },
      })))
    }
  }))

  const handleTermUp = () => {
    const singleAutomation: ReducerAutomationDto = getReduxData( StorageKeys.AUTO )[ machine ]
    setTerm(prev => {
      const updated = update(singleAutomation, {
        term : { $set: ++prev },
      })
      dispatch(controlAutomation( updated ));
      return prev
    })
  }

  const handleTermDown = () => {
    const reduxSetting = store.getState()[ StorageKeys.AUTO ][ machine ];
    setTerm(prev => {
      if( prev <= 1 ) { return 1; }
      const updated = update(reduxSetting, {
        term : { $set: --prev },
      })
      dispatch(controlAutomation( updated ));
      return prev;
    })
  }

  return(
    <>
      <p className='term'>{term} 일</p>
      <div className='term-button-wrapper'>
        <IconButton onClick={handleTermUp} classes={{root : 'term-icon-button'}} size='medium'>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton onClick={handleTermDown} classes={{root : 'term-icon-button'}} size='medium'>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
    </>
  )
}
)

export default React.memo(TermControlButton);