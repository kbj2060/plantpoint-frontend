import * as React from 'react';
import "@styles/components/signin.scss";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import '@styles/components/signin.scss'
import {BaseSyntheticEvent} from "react";
import { SignIn } from './SignIn';

const {Colors} = require('../../values/colors');
const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      borderBottomColor: Colors.fontColor,
    }
  },
})(TextField);

interface SignInProps {
  type: keyof SignIn;
  handleOnChange(e: BaseSyntheticEvent): void ;
}

function SignInInput ({type, handleOnChange}: SignInProps) {
  return (
    <CssTextField id={type} InputProps={{className: 'signin-input'}}
                  className="login" placeholder={type} type={type}
                  onChange={handleOnChange}/>
  )
}

export default React.memo(SignInInput)