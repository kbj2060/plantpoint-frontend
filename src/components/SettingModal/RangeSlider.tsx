import React, {BaseSyntheticEvent, useImperativeHandle} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from "react-redux";
import {controlAutomation, ReducerAutomationDto} from "@redux/modules/ControlAutomation";
import {CustomIosSlider} from "@compUtils/CustomIosSlider";
import update from 'react-addons-update';
import Chip from "@material-ui/core/Chip";
import {StorageKeys} from "../../constants";
import {AvailableMachines} from "@interfaces/main";
import {getReduxData} from "@funcUtils/getReduxData";
import useSubscribeAutomationEnable from "@hooks/useSubscribeAutomationEnable";
import {TaskNextButtonRef} from "./CustomStepper";
import '@styles/components/automation_slider.scss';

interface RangeSliderProps {
  position: AvailableMachines;
}

export const RangeSlider = React.forwardRef((
  { position: machine }: RangeSliderProps,
  ref?: React.Ref<TaskNextButtonRef>
  ) => {
    const {Units} = require('@values/units');
    const {defaultAutomations} = require('@values/defaults')
    const dispatch = useDispatch();
    const automationEnable: boolean = useSubscribeAutomationEnable(machine);
    const singleAutomation: ReducerAutomationDto = getReduxData(StorageKeys.AUTO)[machine]
    const [automation, setAutomation] = React.useState<number[]>([
      +singleAutomation.start[0],
      +singleAutomation.end[0],
    ]);

    function handleChange<T extends BaseSyntheticEvent, U extends number> (
      event: T, value: U | U[]
    ) {
      const values: number[] = value as number[];
      setAutomation(values);
    }

    useImperativeHandle(ref, () => ({
      handleNextStep () {
        const updated: ReducerAutomationDto = update(singleAutomation, {
          start: { $set: [ automation[0] ] },
          end: { $set: [ automation[1] ] },
        })
        dispatch(controlAutomation(updated));
      }
    }))

    function valuetext<T extends number>(value: T) {
      return `${value}${Units[machine]}`;
    }


    function getOnExplanation<T extends AvailableMachines>(machine: T) {
      if (machine === "cooler") {
        return `ON : ${valuetext(automation[1])}`
      } else if (machine === "heater" || machine === "led") {
        return `ON : ${valuetext(automation[0])}`
      }
    }

  function getOffExplanation<T extends AvailableMachines>(machine: T) {
      if (machine === "cooler") {
        return `OFF : ${valuetext(automation[0])}`
      } else if (machine === "heater" || machine === "led") {
        return `OFF : ${valuetext(automation[1])}`
      }
    }

  if (automationEnable) {
    return (
      <div>
        <Grid className='slider-root'>
          <CustomIosSlider
            className='slider'
            min={defaultAutomations[machine].start[0]}
            max={defaultAutomations[machine].end[0]}
            value={automation}
            onChange={handleChange}
          />
        </Grid>
        <Grid className='explanation'>
          <Chip className='on-chip' variant="outlined" size="small" label={getOnExplanation(machine)}/>
          <Chip className='off-chip' variant="outlined" size="small" label={getOffExplanation(machine)}/>
        </Grid>
      </div>
    );
  } else {
    return null;
  }
  }
);
