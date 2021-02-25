import React, {useImperativeHandle} from 'react';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from "react-redux";
import {controlAutomation, ReducerAutomationDto} from "@redux/modules/ControlAutomation";
import {CustomIosSlider} from "../utils/CustomIosSlider";
import update from 'react-addons-update';
import Chip from "@material-ui/core/Chip";
import {StorageKeys} from "../../constants";
import {AvailableMachines} from "@interfaces/main";
import {getReduxData} from "@funcUtils/getReduxData";
import useSubscribeAutomationEnable from "@hooks/useSubscribeAutomationEnable";
import {MachineProps} from "@interfaces/Switch";
import {TaskNextButtonRef} from "./CustomStepper";

interface RangeSliderProp extends MachineProps {}
export const RangeSlider = React.forwardRef(
  ({ machine }: RangeSliderProp,
            ref?: React.Ref<TaskNextButtonRef>) => {
    const {Units} = require('../../values/units');
    const {defaultAutomations} = require('../../values/defaults')
    const dispatch = useDispatch();
    const automationEnable: boolean = useSubscribeAutomationEnable(machine);
    const singleAutomation: ReducerAutomationDto = getReduxData(StorageKeys.AUTO)[machine]
    const [automation, setAutomation] = React.useState<number[]>([
      +singleAutomation.start[0],
      +singleAutomation.end[0],
    ]);

    const handleChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
      const values: number[] = value as number[];
      setAutomation(values);
    };

    useImperativeHandle(ref, () => ({
      handleNextStep () {
        const updated: ReducerAutomationDto = update(singleAutomation, {
          start: {$set: [automation[0]]},
          end: {$set: [automation[1]]},
        })
        dispatch(controlAutomation(updated));
      }
    }));

    function valuetext(value: number) {
      return `${value}${Units[machine]}`;
    }


    const getOnExplanation = (machine: AvailableMachines) => {
      if (machine === "cooler") {
        return `ON : ${valuetext(automation[1])}`
      } else if (machine === "heater" || machine === "led") {
        return `ON : ${valuetext(automation[0])}`
      }
    }

    const getOffExplanation = (machine: AvailableMachines) => {
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
            <Chip className='chip' variant="outlined" size="small" label={getOnExplanation(machine)}/>
            <Chip className='chip' variant="outlined" size="small" label={getOffExplanation(machine)}/>
          </Grid>
        </div>
      );
    } else {
      return null;
    }
  }
);
