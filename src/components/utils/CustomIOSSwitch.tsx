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
}