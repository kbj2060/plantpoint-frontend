import {Units} from "@values/units";
import {Translations} from "@values/translations";
import Chip from "@material-ui/core/Chip";
import LoopIcon from "@material-ui/icons/Loop";
import React from "react";

class ExplanationChipClass {
  valuetext<T extends number, U extends string>(value: T, status: U) { }
  onText () {  }
  offText () {  }
  explanation () {  }
}

export class RangeExplanationChip extends ExplanationChipClass {
  start: number; end: number; machine: keyof typeof Units;
  constructor (
    machine: string,
    automation: number[],
  ) {
    super();
    this.machine = machine as keyof typeof Units;
    this.start = automation[0];
    this.end = automation[1];
  }
  isCoolerException (): boolean { return this.machine === 'cooler' }
  valuetext <T extends number, U extends string> (value: T, status: U) {
    return `${value}${Units[this.machine]} ${Translations[this.machine]} ${status}`;
  }

  onText () { return `${this.valuetext(this.start, '켜기')}`; }
  offText () { return `${this.valuetext(this.end, '끄기')}`; }
  explanation (): JSX.Element {
    return (
      <>
        <Chip className='chip' variant="outlined" size="small" label={`${this.valuetext(this.start, '켜기')}`} />
        <Chip className='chip' variant="outlined" size="small" label={`${this.valuetext(this.end, '끄기')}`} />
      </>
    )
  }
}

export class CoolerExplanationChip extends RangeExplanationChip {
  onText () { return `${this.valuetext(this.end, '켜기')}`; }
  offText () { return `${this.valuetext(this.start, '끄기')}`; }
  explanation(): JSX.Element {
    return (
      <>
        <Chip className='chip' variant="outlined" size="small" label={`${this.valuetext(this.start, '끄기')}`} />
        <Chip className='chip' variant="outlined" size="small" label={`${this.valuetext(this.end, '켜기')}`} />
      </>
    )
  }
}

export class CycleExplanationChip extends ExplanationChipClass {
  start:number[]; end: number[]; term: number;
  constructor(
    start: number[],
    end: number[],
    term: number,
  ) {
    super();
    this.start = start;
    this.end = end;
    this.term = term;
  }

  explanation(): JSX.Element[] {
    let result: JSX.Element[] = [];
    result.push(
      <Chip key={'loop'}
            className='chip'
            icon={<LoopIcon className='chip'/>}
            variant="outlined"
            size="small"
            label={`${this.term} 일`} />
    )
    this.start.forEach((s, i) => {
      result.push (
        <Chip key={`${s} - ${this.end[i]}`}
              className='chip'
              variant="outlined"
              size="small"
              label={`${s} - ${this.end[i]}`} />
      );
    });
    return result;
  }
}
