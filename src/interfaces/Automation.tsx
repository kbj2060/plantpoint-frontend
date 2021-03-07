import {AvailableAutomationType, AvailableMachines, AvailableMachineSection} from "./main";
import {TaskNextButtonRef} from "@components/SettingModal/CustomStepper";
import React, {ReactNode} from "react";
import {RangeSlider} from "@components/SettingModal/RangeSlider";
import TimeSpanPickerWrapper from "@components/SettingModal/TimePickerWrapper";
import SettingExplanation from "@components/SettingModal/SettingExplanation";

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