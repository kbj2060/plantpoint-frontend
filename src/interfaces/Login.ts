export interface LoginState {
  username: string,
  password: string,
}

export interface SignInResult {
  access_token: string,
}

export interface SigninDto {
  username: string,
  password: string,
}

export type AuthStatus = 'INIT'| 'FAILURE' | 'SUCCESS';

export interface AuthDetail {
  isLoggedIn: boolean,
  currentUser: string,
}

export interface Auth {
  login : Record<'status', AuthStatus>,
  status : AuthDetail,
  accessToken: string,
}