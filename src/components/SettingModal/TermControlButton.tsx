import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {controlAutomation} from "@redux/modules/ControlAutomation";
import {useDispatch} from "react-redux";
import update from 'immutability-helper';
import {StorageKeys} from "../../reference/constants";
import {getReduxData} from "@funcUtils/getReduxData";
import {ReducerAutomationDto} from "@redux/modules/ControlAutomation";


interface TermControlButtonProp {
  machine: string;
}

const TermControlButton = (
    {machine}: TermControlButtonProp
  ) => {
  const dispatch = useDispatch();
  const singleAutomation: ReducerAutomationDto = getReduxData( StorageKeys.AUTO )[ machine ]
  const [term, setTerm] = React.useState<number>( singleAutomation.term );

  const handleTermUp = () => {
    const singleAutomation: ReducerAutomationDto = getReduxData( StorageKeys.AUTO )[ machine ]
    setTerm(prev => {
      dispatch(controlAutomation( update( singleAutomation, {
        term : { $set: ++prev },
        })
      ));
      return prev
    })
  }

  const handleTermDown = () => {
    const singleAutomation: ReducerAutomationDto = getReduxData(StorageKeys.AUTO)[ machine ];
    setTerm(prev => {
      if( prev <= 1 ) { return 1; }
      dispatch(controlAutomation( update( singleAutomation, {
        term : { $set: --prev },
        })
      ));
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

export default React.memo(TermControlButton);