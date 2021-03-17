import React, {ReactNode} from "react";
import {TaskNextButtonRef} from "@components/SettingModal/CustomStepper";
import {RangeSlider} from "@components/SettingModal/RangeSlider";
import TimeSpanPickerWrapper from "@components/SettingModal/TimePickerWrapper";
import SettingExplanation from "@components/SettingModal/SettingExplanation";

export class StepperClass {
  position: string; ref: React.Ref<TaskNextButtonRef>;
  constructor (
    position: string,
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
                        position={this.position as string}
                        ref={this.ref} />
  }
}

export class TimePickerStepper extends StepperClass {
  render(): ReactNode {
    return <TimeSpanPickerWrapper outerSize = {150}
                                  key={this.position}
                                  position={this.position as string}
                                  ref={this.ref} />
  }
}

export class AutomationExplanationStepper extends StepperClass {
  render(): ReactNode {
    return <SettingExplanation key={this.position}
                               position={this.position} />
  }
}