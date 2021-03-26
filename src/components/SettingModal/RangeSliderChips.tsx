import { CoolerExplanationChip, RangeExplanationChip } from '@interfaces/ExplanationChip.class';
import { Chip, Grid } from '@material-ui/core';
import React from 'react';

interface RangeSliderChipsProps {
  machine: string;
  start: number;
  end: number;
}

const RangeSliderChips = ({ machine, start, end }: RangeSliderChipsProps) => {

  function getOnExplanation <T extends string> (machine: T) {
    return new RangeExplanationChip( machine, [ start, end ] ).isCoolerException()  
            ? new CoolerExplanationChip( machine, [ start, end ] ).onText() 
            : new RangeExplanationChip( machine, [ start, end ] ).onText();
  }


  function getOffExplanation <T extends string> (machine: T) {
    return new RangeExplanationChip( machine, [ start, end ] ).isCoolerException()  
            ? new CoolerExplanationChip( machine, [ start, end ] ).offText() 
            : new RangeExplanationChip( machine, [ start, end ] ).offText();
  }

  return (
    <Grid className='explanation'>
      <Chip className='on-chip' variant="outlined" size="small" label={getOnExplanation(machine)}/>
      <Chip className='off-chip' variant="outlined" size="small" label={getOffExplanation(machine)}/>
    </Grid>
  )
}

export default React.memo(RangeSliderChips);