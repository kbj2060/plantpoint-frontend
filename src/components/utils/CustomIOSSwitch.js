import {withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";

const customTheme = '#D9D8D2';
const neumInShadow = 'inset 6px 6px 12px #a5a4a0,inset -6px -6px 12px #ffffff';
export const CustomIOSSwitch = withStyles((theme) => ({
  root: {
    width: 48,
    height: 26,
    padding: 0,
  },
  switchBase: {
    border: 'none',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: 1,
    display:'flex',
    alignItems:'center',
    transition: 'transform 0.6s cubic-bezier(0.85, 0.05, 0.18, 1.35)',
    '&$checked': {
      overflow: 'hidden',
      transform: 'translateX(22px)',
      '& + $track': {
        backgroundColor : customTheme,
        boxShadow: neumInShadow,
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
    background: customTheme,
    border : 'none',
  },
  track: {
    border: 'none',
    borderRadius: 26 / 2,
    backgroundColor: customTheme,
    boxShadow : neumInShadow,
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
    />
  );
});

/*
import Switch from "@material-ui/core/Switch";
import React from "react";
import '@styles/components/custom_ios_switch.scss';

import '@styles/abstracts/_variables.scss';

interface CustomIOSSwitchProps {
  checked: boolean;
  key: string;
  onChange : (e: { persist: () => void; target: { checked: any; };}) => void;
  value: string
}
export const CustomIOSSwitch = ({  ...props }: CustomIOSSwitchProps) => {
  return (
    <Switch
      focusVisibleClassName='focusVisible'
      disableRipple
      classes={{
        root: 'root',
        switchBase: 'switchBase',
        thumb: 'thumb',
        track: 'track',
        checked: 'checked',
      }}
      {...props}
    />
  );
}*/
