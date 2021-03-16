// export type string =
//   | 'waterpump'
//   | 'led'
//   | 'cooler'
//   | 'heater'
//   | 'fan'
//   | 'roofFan'

// TODO : Available 변수들 디비에서 꺼내오는 방식으로 바꿀 것.
export type AvailableEnvironment =
  | 'co2'
  | 'temperature'
  | 'humidity'

export type AvailableEnvironmentSection =
  | 'd1'
  | 'd2'
  | 'd3'

export type AvailableAutomationType =
  | 'cycle'
  | 'range'

export interface ComponentState {
  isLoaded : boolean,
  error: any,
}

export interface MachineProps {
  machine: string;
}