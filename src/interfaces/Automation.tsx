import {AvailableAutomationType, AvailableMachines, AvailableMachineSection} from "./main";
import {TaskNextButtonRef} from "@components/SettingModal/CustomStepper";
import React, {ReactNode} from "react";
import {RangeSlider} from "@components/SettingModal/RangeSlider";
import TimeSpanPickerWrapper from "@components/SettingModal/TimePickerWrapper";
import SettingExplanation from "@components/SettingModal/SettingExplanation";
import {Units} from "@values/units";
import {Translations} from "@values/translations";
import Chip from "@material-ui/core/Chip";
import LoopIcon from "@material-ui/icons/Loop";

export interface ResponseAutomationRead {
  lastAutomations: Automation[];
}

export interface Automation {
  start: string[];
  end: string[];
  term: number;
  enable: boolean;
  machine: AvailableMachines;
  automationType: AvailableAutomationType;
  machineSection: AvailableMachineSection;
}


class Stepper {
  position: string; ref: React.Ref<TaskNextButtonRef>;
  constructor (
    position: string | AvailableMachines,
    ref?: React.Ref<TaskNextButtonRef>
  ) {
    this.position = position;
    this.ref = ref as React.Ref<TaskNextButtonRef>;
  }

  render() {}
}

export class RangeStepper extends Stepper {
  render(): ReactNode {
    return <RangeSlider key={this.position}
                        position={this.position as AvailableMachines}
                        ref={this.ref} />
  }
}

export class TimePickerStepper extends Stepper {
  outerSize: number;
  constructor(
    position: string,
    outerSize: number,
    ref: React.Ref<TaskNextButtonRef>,
  ) {
    super(position, ref);
    this.outerSize = outerSize;
  }

  render(): ReactNode {
    return <TimeSpanPickerWrapper outerSize = {this.outerSize}
                                  key={this.position}
                                  position={this.position as AvailableMachines}
                                  ref={this.ref} />
  }
}

export class AutomationExplanationStepper extends Stepper {
  render(): ReactNode {
    return <SettingExplanation key={this.position}
                               position={this.position} />
  }
}

export class ExplanationChip {
  valuetext<T extends number, U extends string>(value: T, status: U) { }
  onText () {  }
  offText () {  }
  explanation () {  }
}

export class RangeExplanationChip extends ExplanationChip {
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

export class CycleExplanationChip extends ExplanationChip {
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
