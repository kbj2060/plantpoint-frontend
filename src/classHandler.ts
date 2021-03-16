import {
  CoolerMachine, EmptyMachine,
  FanMachine,
  HeaterMachine,
  LedMachine,
  RoofFanMachine,
  WaterPumpMachine
} from "./reference/machines";

//
// export function getStepper(machineType: string) {
//   console.log(machineType)
//   if (machineType === 'head' || machineType === 'tail') {
//     return AutomationExplanationStepper
//   }
//   else if (machineType === 'TimeRangeMachine' || machineType === 'TemperatureRangeMachine'){
//     return RangeStepper
//   }
//   else if (machineType === 'CycleMachine') {
//     return TimePickerStepper
//   }
//   else {
//     throw new RangeError()
//   }
// }

export function getMachine(name: string) {
  switch (name) {
    case 'led': { return LedMachine }
    case 'heater': { return HeaterMachine }
    case 'cooler': { return CoolerMachine }
    case 'fan': { return FanMachine }
    case 'roofFan': { return RoofFanMachine }
    case 'waterpump': { return WaterPumpMachine }
    default: return EmptyMachine
  }
}