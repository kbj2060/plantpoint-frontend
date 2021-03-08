import React, {ReactNode} from "react";
import {TaskNextButtonRef} from "@components/SettingModal/CustomStepper";
import {AvailableMachines} from "@interfaces/main";
import {RangeSlider} from "@components/SettingModal/RangeSlider";
import TimeSpanPickerWrapper from "@components/SettingModal/TimePickerWrapper";
import SettingExplanation from "@components/SettingModal/SettingExplanation";

class StepperClass {
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

export class RangeStepper extends StepperClass {
  render(): ReactNode {
    return <RangeSlider key={this.position}
                        position={this.position as AvailableMachines}
                        ref={this.ref} />
  }
}

export class TimePickerStepper extends StepperClass {
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

export class AutomationExplanationStepper extends StepperClass {
  render(): ReactNode {
    return <SettingExplanation key={this.position}
                               position={this.position} />
  }
}