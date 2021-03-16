import React, {BaseSyntheticEvent, useImperativeHandle} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from "react-redux";
import {controlAutomation, ReducerAutomationDto} from "@redux/modules/ControlAutomation";
import {CustomIosSlider} from "@compUtils/CustomIosSlider";
import update from 'react-addons-update';
import Chip from "@material-ui/core/Chip";
import {StorageKeys} from "../../constants";
import {getReduxData} from "@funcUtils/getReduxData";
import useSubscribeAutomationEnable from "@hooks/useSubscribeAutomationEnable";
import {TaskNextButtonRef} from "./CustomStepper";
import '@styles/components/automation_slider.scss';
import {CoolerExplanationChip, RangeExplanationChip} from "@interfaces/ExplanationChip.class";

interface RangeSliderProps {
  position: string;
}

export const RangeSlider = React.forwardRef((
  { position: machine }: RangeSliderProps,
  ref?: React.Ref<TaskNextButtonRef>
  ) => {
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
      setAutomation(value as number[]);
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

    function getOnExplanation<T extends string>(machine: T) {
      if ( machine === "cooler" ) {
        return new CoolerExplanationChip( machine, automation).onText();
      } else {
        return new RangeExplanationChip( machine, automation ).onText();
      }
    }

  function getOffExplanation<T extends string>(machine: T) {
      if ( machine === "cooler" ) {
        return new CoolerExplanationChip( machine, automation).offText();
      } else {
        return new RangeExplanationChip( machine, automation ).offText();
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
