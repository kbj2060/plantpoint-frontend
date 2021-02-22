export const AppName = 'Plant Point';
export const DrawerDirection = 'right';

export enum LocalStorageKeys {
  AUTHENTICATION = 'authentication',
  SWITCHES='switches',
  AUTO='auto',
}

export enum HttpUrls {
  SIGNIN = `http://localhost:9000/authentication/signin`,
  SWITCHES_CREATE = 'http://localhost:9000/switches/create'
}

export enum Reports {
  SIGNIN_FINISH = 'Login Finished..',
  SWITCH_CHANGED = 'Switch Changed..',
}

export enum Texts {
  LOGIN = '로그인',
  OK = '확인',
}
export enum Messages {
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
  MAIN = 's1',
  SCHEDULER = '일정',
  SETTING ='설정',
  LOGOUT='로그아웃',
}

