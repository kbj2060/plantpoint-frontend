import React, {useImperativeHandle, useState} from 'react';
import CircularTimespanpicker from "./TimeSpanPicker";
import {useDispatch} from "react-redux";
import {controlAutomation} from "@redux/modules/ControlAutomation";
import useWindowDimensions from "@hooks/useWindowDimensions";
import TermControlButton from "./TermControlButton";
import {StorageKeys} from "../../constants";
import {getReduxData} from "@funcUtils/getReduxData";
import {AvailableMachines} from "@interfaces/main";
import useSubscribeAutomationEnable from "@hooks/useSubscribeAutomationEnable";
import {TaskNextButtonRef} from "./CustomStepper";
import {Moment} from "moment";
import update from 'immutability-helper';
import '@styles/components/timepicker.scss';

interface Times {
  start: Moment[];
  end: Moment[];
}

interface TimeSpanPickerProp {
  position: AvailableMachines;
  outerSize: number;
}

const TimeSpanPickerWrapper = React.forwardRef(
  ({position: machine, outerSize}: TimeSpanPickerProp,
          ref?: React.Ref<TaskNextButtonRef>
  ) => {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const automationEnable: boolean = useSubscribeAutomationEnable(machine);
  const customHeight = ( height / 2 ) + 5;
  const customWidth = ( width / 2 ) - 20;
  const TIME_FORMAT = 'HH:mm';
  const singleAutomation = getReduxData(StorageKeys.AUTO)[machine]
  const [times, setTimes] = useState<Times>({
    start: singleAutomation.start,
    end: singleAutomation.end,
  });

  function handleTimePicker<T extends Moment[]> (arrTimes: T[]) {
    const formattedStartTimes: Moment[] = arrTimes.map((t: any) => t[0].format(TIME_FORMAT))
    const formattedEndTimes: Moment[] = arrTimes.map((t: any) => t[1].format(TIME_FORMAT))
    setTimes(update(times, {
      start: { $set: formattedStartTimes },
      end: { $set: formattedEndTimes },
    }))
  }

  useImperativeHandle(ref, () => ({
    handleNextStep () {
      dispatch(controlAutomation(update(singleAutomation, {
        start: { $set: times.start }, end: { $set: times.end }
      })))
    }
  }))

  return(
    <div className='timepicker-wrapper' >
      {automationEnable
        ? <>
            <div className='timepicker' >
              <CircularTimespanpicker
                subject={machine}
                onClick={handleTimePicker}
                outerRadius={outerSize}
                boundaryHour={0} showResults={false} />
            </div>
            <div style={{
              top: customHeight, left: customWidth,
              position: 'absolute', display:'flex',
              zIndex:'auto', fontSize:'1.1rem'
            }}>
              <TermControlButton machine={machine}/>
            </div>
          </>
        : null
      }
    </div>
  )
}
)

export default React.memo(TimeSpanPickerWrapper);