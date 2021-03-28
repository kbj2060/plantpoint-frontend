import {API} from "./secret";

export const AppName = 'Plant Point';
export const DrawerDirection = 'right';

export enum StorageKeys {
  AUTHENTICATION = 'authentication',
  SWITCHES='switches',
  AUTO='automation',
  MACHINE='machine',
  ENVIRONMENTS='environments',
  SECTION='section',
  CURRENT='current'
}

export enum WebSocketEvent {
  SEND_SWITCH_TO_SERVER = 'sendSwitchToServer',
  SEND_SWITCH_TO_CLIENT = 'sendSwitchToClient'
}

export const HttpUrls = {
  SIGNIN : `${API}/authentication/signin`,

  AUTOMATION_READ : `${API}/automations/read`,
  AUTOMATION_CREATE : `${API}/automations/create`,

  SWITCHES_CREATE : `${API}/switches/create`,
  SWITCHES_READ_LAST : `${API}/switches/read/last`,
  SWITCHES_READ : `${API}/switches/read/history`,

  MACHINES_READ : `${API}/machines/read`,
  CURRENT_READ : `${API}/currents/read`,
  ENV_SECTION_READ : `${API}/sections/read`,

  ENVIRONMENTS_READ_LAST : `${API}/environments/read/last`,
  ENVIRONMENTS_READ_LASTALL : `${API}/environments/read/lastAll`,
  ENVIRONMENT_READ_HISTORY : `${API}/environments/read/history`,

  SCHEDULES_CREATE : `${API}/schedules/create`,
  SCHEDULES_READ : `${API}/schedules/read`,
  SCHEDULES_UPDATE : `${API}/schedules/update`,
  SCHEDULES_DELETE : `${API}/schedules/delete`,
}

export enum Reports {
  MACHINES_LOADED = 'Machines Loaded..',
  ENV_SECTIONS_LOADED = 'Environment Sections Loaded..',
  SIGNIN_FINISH = 'Login Finished..',
  SWITCH_CHANGED = 'Switch Changed..',
  SWITCH_LOADED = 'Switch Loaded..',
  AUTOMATION_LOADED = 'Automation Loaded..',
  CURRENT_LOADED = 'Current Loaded..',
  SWITCH_HISTORY_LOADED = 'Switch History Loaded..',
  ENVIRONMENTS_LOADED = 'Environments Loaded..',
  ENVIRONMENTS_HISTORY_LOADED = 'Environments History Loaded..',
  SCHEDULES_REMOVED = 'Schedules Removed..',
  SCHEDULES_CREATED = 'Schedules Created..',
}

export enum LogMessage {
  SUCCESS_GET_MACHINES = 'Machines Loading Success',
  FAILED_GET_MACHINES = 'Machines Loading Failed',
  SUCCESS_GET_SECTIONS = 'Sections Loading Success',
  FAILED_GET_SECTIONS = 'Sections Loading Failed',
  SUCCESS_GET_ENVIRONMENTS = 'Environemts Loading Success',
  FAILED_GET_ENVIRONMENTS = 'Environemts Loading Failed',
  SUCCESS_GET_SWITCHES = 'Switches Loading Success',
  FAILED_GET_SWITCHES = 'Switches Loading Failed',
  SUCCESS_GET_AUTOMATIONS = 'Automations Loading Success',
  FAILED_GET_AUTOMATIONS = 'Automations Loading Failed',
  SUCCESS_GET_ENVIRONMENTS_HISTORY = 'Environment History Loading Success',
  FAILED_GET_ENVIRONMENTS_HISTORY = 'Environment History Loading Failed',
  SUCCESS_GET_SWITCHES_HISTORY = 'Switches History Loading Success',
  FAILED_GET_SWITCHES_HISTORY = 'Switches History Loading Failed',
  SUCCESS_CHANGE_SWITCH = 'Switch Change Success',
  FAILED_CHANGE_SWITCH = 'Switch Change Failed',
  SUCCESS_GET_CURRENT_ENVIRONMENT = 'Current Environments Loading Success',
  FAILED_GET_CURRENT_ENVIRONMENT= 'Current Environments Loading Failed',
  SUCCESS_SIGNIN = 'Signin Success',
  FAILED_SIGNIN = 'Signin Failed',
  SUCCESS_GET_CURRENTS = 'Currents Loading Success',
  FAILED_GET_CURRENTS = 'Currents Loading Failed',
}

export enum Texts {
  LOGIN = '로그인',
  OK = '확인',
}

export enum Errors {
  NO_AUTOMATION_DATA= '해당하는 기계의 자동화 정보가 존재하지 않습니다. 기본값으로 지정합니다.',
  SIGNIN_FAILURE_TITLE = '로그인 실패',
  SIGNIN_FAILURE_DESC = '아이디 혹은 비밀번호를 확인해주세요.',
  POST_SWITCH_FAILURE = '스위치 작동 실패했습니다. 서버와의 통신을 확인해주세요.',
  GET_MACHINE_HISTORY_FAILURE = '스위치 기록 불러오기 실패했습니다. 서버와의 통신을 확인해주세요.'
}

export enum AuthResults {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export enum PagePaths {
  MAIN = 's1',
  SCHEDULER = 'scheduler',
  SETTING ='setting',
  LOGIN='',
}

export enum PageNames {
  MAIN = '무들로29',
  SCHEDULER = '일정',
  SETTING ='설정',
  LOGOUT='로그아웃',
}

