export const AppName = 'Plant Point';
export const DrawerDirection = 'right';

export enum StorageKeys {
  AUTHENTICATION = 'authentication',
  SWITCHES='switches',
  AUTO='automation',
  MACHINE='machine',
}

export enum HttpUrls {
  SIGNIN = `http://localhost:9000/authentication/signin`,
  AUTOMATION_READ = 'http://localhost:9000/automations/read',
  AUTOMATION_CREATE = 'http://localhost:9000/automations/create',
  SWITCHES_CREATE = 'http://localhost:9000/switches/create',
  SWITCHES_READ_LAST = 'http://localhost:9000/switches/read/last',
  MACHINES_READ = 'http://localhost:9000/machines/read',
  CURRENT_READ = 'http://localhost:9000/currents/read'
}

export enum Reports {
  SIGNIN_FINISH = 'Login Finished..',
  SWITCH_CHANGED = 'Switch Changed..',
  SWITCH_LOADED = 'Switch Loaded..',
  AUTOMATION_LOADED = 'Automation Loaded..',
  CURRENT_LOADED = 'Current Loaded..',
}

export enum Texts {
  LOGIN = '로그인',
  OK = '확인',
}
export enum Messages {
  NO_AUTOMATION_DATA= '해당하는 기계의 자동화 정보가 존재하지 않습니다. 기본값으로 지정합니다.',
  SIGNIN_FAILURE_TITLE = '로그인 실패',
  SIGNIN_FAILURE_DESC = '아이디 혹은 비밀번호를 확인해주세요.',
}

export enum AuthResults {
  INIT = 'INIT',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

// TODO: 추후에 DB에 저장할 것.
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

