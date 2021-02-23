export type LoginState = {
  username: string,
  password: string,
};

export type SignInResult = {
  access_token: string,
}

export type SigninDto = {
  username: string,
  password: string,
}

export type AuthStatus = 'INIT'| 'FAILURE' | 'SUCCESS';

export type AuthDetail = {
  isLoggedIn: boolean,
  currentUser: string,
};

export type Auth = {
  login : Record<'status', AuthStatus>,
  status : AuthDetail,
  accessToken: string,
};