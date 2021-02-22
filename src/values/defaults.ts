import {Auth, LoginState} from "../interfaces/Ilogin";
import {ReducerSwitchState} from "../redux/modules/ControlSwitch";
import {AvailableAutomationType, AvailableMachines, AvailableMachineSection} from "../interfaces/main";

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

export const defaultLoginState: LoginState = {
  username: "",
  password: "",
}

export const defaultSwitchesState: ReducerSwitchState = {
  s1 : {
    waterpump: false,
    led: false,
    cooler: false,
    heater: false,
    fan: false
  }
}

export const defaultAutomation = {
  waterpump : {
    start: [''],
    end: [''],
    term: 1,
    enable: false,
    machine: 'waterpump',
    automationType: 'cycle',
    machineSection: 's1',
  },
  fan : {
    start: [''],
    end: [''],
    term: 1,
    enable: false,
    machine: 'fan',
    automationType: 'range',
    machineSection: 's1',
  },
  cooler : {
    start: [''],
    end: [''],
    term: 1,
    enable: false,
    machine: 'cooler',
    automationType: 'range',
    machineSection: 's1',
  },
  heater : {
    start: [''],
    end: [''],
    term: 1,
    enable: false,
    machine: 'heater',
    automationType: 'range',
    machineSection: 's1',
  },
  led : {
    start: [''],
    end: [''],
    term: 1,
    enable: false,
    machine: 'led',
    automationType: 'cycle',
    machineSection: 's1',
  },
}