import React, {BaseSyntheticEvent, useCallback, useEffect} from "react";
import {Auth, LoginState, SigninDto, SignInResult} from "@interfaces/Login";
import {defaultAuth} from "@values/defaults";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginFailure, loginSuccess} from "@redux/modules/Authentication";
import axios from "axios";
import {AppName, AuthResults, HttpUrls, Errors, PagePaths, Reports, Texts} from "../../constants";
import CustomDialog from "@compUtils/CustomDialog";
import SignInInput from "./SiginInput";
import '@styles/components/signin.scss'

function getSuccessAuth<T extends string>(username: T, token: T): Auth {
  return {
    login: {
      status: 'SUCCESS'
    },
    status: {
      isLoggedIn: true,
      currentUser: username,
    },
    accessToken: token,
  }
}

interface SignIn {
  username: string;
  password: string;
}

export default function SignInComponent() {
  const [auth, setAuth] = React.useState<Auth>(defaultAuth);
  const [open, setOpen] = React.useState<boolean>(false);
  const signin: SignIn = { username: '', password: '' } as SignIn;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickDialogOpen = () => {
    setOpen(true);
  }

  const handleDialogClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLoginChange = <T extends keyof LoginState> (type: T) => <U extends BaseSyntheticEvent> (e: U): void => {
    signin[type] = e.target.value
  }

  function dispatchLoginSuccess <T extends string> (username: T, accessToken: T): void {
    dispatch(loginSuccess(username, accessToken))
  }

  const dispatchLoginFailure = (): void => {
    setOpen(true)
    dispatch(loginFailure())
  }

  const resetAuth = (): void => {
    setAuth(defaultAuth);
  }

  async function loginRequest <T extends string> (username: T, password: T) {
    await axios.post(HttpUrls.SIGNIN, {
        username: username,
        password: password,
    } as SigninDto)
      .then(({data}) => {
        const {access_token}: SignInResult = data;
        const updatedAuth = getSuccessAuth(username, access_token);
        dispatchLoginSuccess(username, access_token);
        setAuth(updatedAuth);
      })
      .catch(() => {
        dispatchLoginFailure();
      });
  }

  function handleSubmit<T extends BaseSyntheticEvent>(event: T): void {
    event.preventDefault();
    loginRequest(signin.username, signin.password)
      .then(() => Reports.SIGNIN_FINISH);
  }

  useEffect(() => {
    switch ( auth.login.status ) {
      case AuthResults.INIT :
        return;
      // TODO : 페이지는 나중에 DB에 저장할 것.
      case AuthResults.SUCCESS :
        history.push(`/${PagePaths.MAIN}`);
        break;
      default:
        handleClickDialogOpen();
        break;
    }
    return () => { resetAuth() }
  }, [auth, history])

  return (
    <div className="login-form" >
      <form>
        <p className="signin-title">{AppName}</p>
        <div>
          <SignInInput type={'username'} handleOnChange={handleLoginChange('username')} />
          <SignInInput type={'password'} handleOnChange={handleLoginChange('password')} />
        </div>
        <div>
          <button onClick={handleSubmit} className="login-button" type="submit" >{Texts.LOGIN}</button>
        </div>
      </form>
      <CustomDialog
        open={open}
        handleClose={handleDialogClose}
        title={Errors.SIGNIN_FAILURE_TITLE}
        description={Errors.SIGNIN_FAILURE_DESC} />
    </div>
  )
}