import React, {useCallback, useEffect} from "react";
import {Auth, LoginState, SigninDto, SignInResult} from "../../interfaces/Ilogin";
import {defaultAuth, defaultLoginState} from "../../values/defaults";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginFailure, loginSuccess} from "../../redux/modules/Authentication";
import axios from "axios";
import {saveState} from "../LocalStorage";
import {AppName, AuthResults, HttpUrls, LocalStorageKeys, Messages, PagePaths, Reports, Texts} from "../../constants";
import CustomDialog from "../utils/customDialog";
import SignInInput from "./siginInput";
import '../../styles/components/signin.scss'

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

export default function SignInComponent() {
  const [login, setLogin] = React.useState<LoginState>(defaultLoginState);
  const [auth, setAuth] = React.useState<Auth>(defaultAuth);
  const [open, setOpen] = React.useState<boolean>(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickDialogOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLoginChange = useCallback((type: keyof LoginState) => (e: { target: { value: any; }; }): void => {
    setLogin({ ...login, [type]: e.target.value })
  }, [login]);

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
        saveState(LocalStorageKeys.AUTHENTICATION, updatedAuth);
        setAuth(updatedAuth);
      })
      .catch(() => {
        dispatchLoginFailure();
      });
  }

  const handleSubmit = (event: { preventDefault: () => void; }): void => {
    event.preventDefault();
    loginRequest(login.username, login.password).then(() => Reports.SIGNIN_FINISH);
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
  }, [auth, history, handleClickDialogOpen])

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
        title={Messages.SIGNIN_FAILURE_TITLE}
        description={Messages.SIGNIN_FAILURE_DESC} />
    </div>
  )
}