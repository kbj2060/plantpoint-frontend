export const AppName = 'Plant Point';
export const DrawerDirection = 'right';

export enum StorageKeys {
  AUTHENTICATION = 'authentication',
  SWITCHES='switches',
  AUTO='automation',
  MACHINE='machine',
  ENVIRONMENTS='environments',
}

export enum WebSocketEvent {
  SEND_SWITCH_TO_SERVER = 'sendSwitchToServer',
  SEND_SWITCH_TO_CLIENT = 'sendSwitchToClient'
}

export enum HttpUrls {
  SIGNIN = `http://localhost:9000/authentication/signin`,

  AUTOMATION_READ = 'http://localhost:9000/automations/read',
  AUTOMATION_CREATE = 'http://localhost:9000/automations/create',

  SWITCHES_CREATE = 'http://localhost:9000/switches/create',
  SWITCHES_READ_LAST = 'http://localhost:9000/switches/read/last',
  SWITCHES_READ = 'http://localhost:9000/switches/read/history',

  MACHINES_READ = 'http://localhost:9000/machines/read',
  CURRENT_READ = 'http://localhost:9000/currents/read',

  ENVIRONMENTS_READ_LAST = 'http://localhost:9000/environments/read/last',
  ENVIRONMENT_READ_HISTORY = 'http://localhost:9000/environments/read/history',

  SCHEDULES_CREATE = 'http://localhost:9000/schedules/create',
  SCHEDULES_READ = 'http://localhost:9000/schedules/read',
  SCHEDULES_UPDATE = 'http://localhost:9000/schedules/update',
  SCHEDULES_DELETE = 'http://localhost:9000/schedules/delete',
}

export enum Reports {
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

