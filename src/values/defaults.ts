import {Auth} from "@interfaces/Login";
import {ReducerSwitchState} from "@redux/modules/ControlSwitch";

export const defaultAuth: Auth = {
  login: {
    status: 'INIT'
  },
  status: {
    isLoggedIn: false,
    currentUser: '',
  },
  accessToken: '',
}

export const UpdateTimeOut = {
  current: '10000',
  history: '60000',
  status: '50000'
}

export const Criteria = {
  current: 1,
  switchHistory: 20,
}

export const defaultSwitchesState: ReducerSwitchState = {
    waterpump: false,
    led: false,
    cooler: false,
    heater: false,
    fan: false,
    roofFan: false,
}

export const environments = ['co2', 'humidity', 'temperature'];
export const environmentSections = ['d1', 'd2', 'd3'];
export const machines = ['waterpump', 'led', 'cooler', 'heater', 'fan', 'roofFan'];

export const defaultEnvironment = {
    "humidity": '0',
    "co2": '0',
    "temperature": '0'
  }

export const defaultAutomations = {
  waterpump : {
    start: [],
    end: [],
    term: 1,
    enable: false,
    machine: 'waterpump',
    automationType: 'cycle',
    machineSection: 's1',
  },
  fan : {
    start: [],
    end: [],
    term: 1,
    enable: false,
    machine: 'fan',
    automationType: 'cycle',
    machineSection: 's1',
  },
  roofFan : {
    start: [],
    end: [],
    term: 1,
    enable: false,
    machine: 'fan',
    automationType: 'cycle',
    machineSection: 's1',
  },
  cooler : {
    start: [10],
    end: [40],
    term: 1,
    enable: false,
    machine: 'cooler',
    automationType: 'range',
    machineSection: 's1',
  },
  heater : {
    start: [10],
    end: [40],
    term: 1,
    enable: false,
    machine: 'heater',
    automationType: 'range',
    machineSection: 's1',
  },
  led : {
    start: [0],
    end: [23],
    term: 1,
    enable: false,
    machine: 'led',
    automationType: 'range',
    machineSection: 's1',
  },
}

