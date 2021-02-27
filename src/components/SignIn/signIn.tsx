import React, {useCallback, useEffect} from "react";
import {Auth, LoginState, SigninDto, SignInResult} from "@interfaces/Login";
import {defaultAuth} from "@values/defaults";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginFailure, loginSuccess} from "@redux/modules/Authentication";
import axios from "axios";
import {saveState} from "../LocalStorage";
import {AppName, AuthResults, HttpUrls, StorageKeys, Errors, PagePaths, Reports, Texts} from "../../constants";
import CustomDialog from "@compUtils/CustomDialog";
import SignInInput from "./SiginInput";
import '@styles/components/signin.scss'

function getSuccessAuth (username: string, token: string): Auth {
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

  const handleLoginChange =(type: keyof LoginState) => (e: { target: { value: any; }; }): void => {
    signin[type] = e.target.value
    /*setLogin({ ...login, [type]: e.target.value })*/
  }

  const dispatchLoginSuccess = (username: string, accessToken: string): void  => {
    dispatch(loginSuccess(username, accessToken))
  }

  const dispatchLoginFailure = (): void => {
    setOpen(true)
    dispatch(loginFailure())
  }

  const resetAuth = (): void => {
    setAuth(defaultAuth);
  }

  const loginRequest = async (username: string, password: string) => {
    const signinDto: SigninDto = {
      username: username,
      password: password,
    }
    await axios.post(HttpUrls.SIGNIN, signinDto)
      .then(({data}) => {
        const result: SignInResult = data;
        const accessToken = result.access_token;
        const updatedAuth = getSuccessAuth(username, accessToken);

        dispatchLoginSuccess(username, accessToken);
        saveState(StorageKeys.AUTHENTICATION, updatedAuth);
        setAuth(updatedAuth);
      })
      .catch(() => {
        dispatchLoginFailure();
      });
  }

  const handleSubmit = (event: { preventDefault: () => void; }): void => {
    event.preventDefault();
    loginRequest(signin.username, signin.password).then(() => Reports.SIGNIN_FINISH);
  };

  useEffect(() => {
    switch (auth.login.status) {
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