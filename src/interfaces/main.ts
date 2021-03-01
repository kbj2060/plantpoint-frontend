export type AvailableMachines =
  | 'waterpump'
  | 'led'
  | 'cooler'
  | 'heater'
  | 'fan'

export type AvailableMachineSection = 's1'

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
  machine: AvailableMachines;
}