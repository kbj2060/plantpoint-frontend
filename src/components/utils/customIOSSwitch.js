import {withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";
import * as styles from '@styles/abstracts/_variables.scss';

const {Colors} = require('../../values/colors')
export const CustomIOSSwitch = withStyles((theme) => ({
  root: {
    width: 48,
    height: 26,
    padding: 0,
  },
  switchBase: {
    border: 'none',
    borderRadius: '50%',
    background: styles['custom-theme'],
    overflow: 'hidden',
    boxShadow: Colors.neumInShadow,
    padding: 1,
    display:'flex',
    alignItems:'center',
    transition: 'transform 0.6s cubic-bezier(0.85, 0.05, 0.18, 1.35)',
    '&$checked': {
      overflow: 'hidden',
      transform: 'translateX(22px)',
      '& + $track': {
        backgroundColor : Colors.customTheme,
        boxShadow: Colors.neumInShadow,
        opacity: 1,
        overflow: 'hidden',
      },
    },
    '&$focusVisible $thumb': {
      overflow: 'hidden',
    },
  },
  thumb: {
    overflow: 'hidden',
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: Colors.customTheme,
    border : 'none',
  },
  track: {
    border: 'none',
    borderRadius: 26 / 2,
    backgroundColor: Colors.customTheme,
    boxShadow : Colors.neumInShadow,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {   },
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    >
    </Switch>
  );
});