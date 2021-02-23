import * as React from 'react';
import {LoginState} from "../../interfaces/Ilogin";
import styles from "../../styles/components/signin.scss";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import '../../styles/components/signin.scss'

const {Colors} = require('../../values/colors');
const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      borderBottomColor: Colors.fontColor,
    }
  },
})(TextField);

type SignInProps = {
  type: keyof LoginState;
  handleOnChange(e: { target: { value: any;}; }): void ;
}

function SignInInput ({type, handleOnChange}: SignInProps) {
  return (
    <CssTextField id={type} InputProps={{className: styles.input}}
                  className="login" placeholder={type} type={type} onChange={handleOnChange}/>
  )
}

export default React.memo(SignInInput)