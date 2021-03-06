import React, {BaseSyntheticEvent, useCallback, useEffect} from "react";
import {Auth, SigninDto, SignInResult} from "@interfaces/Login";
import {defaultAuth} from "@values/defaults";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginFailure, loginSuccess} from "@redux/modules/Authentication";
import axios from "axios";
import {AppName, AuthResults, HttpUrls, Errors, PagePaths, Texts, LogMessage} from "../../reference/constants";
import CustomDialog from "@compUtils/CustomDialog";
import SignInInput from "./SiginInput";
import '@styles/components/signin.scss'
import {customLogger} from "../../logger/Logger";

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

export interface SignIn {
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
  }, []); // eslint-disable-line

  const handleLoginChange = useCallback(<T extends keyof SignIn> (type: T) => <U extends BaseSyntheticEvent> (e: U): void => {
    signin[type] = e.target.value
  }, []); // eslint-disable-line

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
    } as SigninDto, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(({data}) => {
        const {access_token}: SignInResult = data;
        const updatedAuth = getSuccessAuth(username, access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token || ""}`;
        dispatchLoginSuccess(username, access_token);
        setAuth(updatedAuth);
      })
      .catch((err) => {
        console.log(err)
        customLogger.error(LogMessage.FAILED_SIGNIN, 'SignIn' as string)
        dispatchLoginFailure();
      })
  }

  function handleSubmit<T extends BaseSyntheticEvent>(event: T): void {
    event.preventDefault();
    loginRequest(signin.username, signin.password)
      .then(() => customLogger.success(LogMessage.SUCCESS_SIGNIN, 'SignIn' as string));
  }

  useEffect(() => {
    switch ( auth.login.status ) {
      case AuthResults.INIT :
        return;
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