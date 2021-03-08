import AcUnitIcon from "@material-ui/icons/AcUnit";
import React from "react";
import CustomRoofFanIcon from '../assets/icons/RoofFanIcon';
import '@styles/components/switch_controller.scss';
import '@styles/animations/fan_out.scss';
import WhatshotIcon from "@material-ui/icons/Whatshot";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ToysIcon from "@material-ui/icons/Toys";
import OpacityIcon from "@material-ui/icons/Opacity";

abstract class IconClass {
  abstract activeIcon =  (): JSX.Element => { return <></> }
  abstract inactiveIcon =  (): JSX.Element => { return <></> }
  iconHandler = <T extends boolean>(active: T): JSX.Element => {
    return active ? this.activeIcon() : this.inactiveIcon();
  }
}

export class CoolerIcon extends IconClass {
  activeIcon = (): JSX.Element => { return <AcUnitIcon className='cooler-icon'/> }
  inactiveIcon = (): JSX.Element => { return <AcUnitIcon className='default-icon'/> }
}

export class HeaterIcon extends IconClass {
  activeIcon = (): JSX.Element => { return <WhatshotIcon className='heater-icon' /> }
  inactiveIcon = (): JSX.Element => { return <WhatshotIcon className='default-icon'/> }
}

export class LEDIcon extends IconClass {
  activeIcon = (): JSX.Element => { return <WbSunnyIcon className='led-icon' /> }
  inactiveIcon = (): JSX.Element => { return <WbSunnyIcon className='default-icon' /> }
}

export class RoofFanIcon extends IconClass {
  activeIcon = (): JSX.Element => { return <CustomRoofFanIcon className='roofFan-icon' /> }
  inactiveIcon = (): JSX.Element => { return <CustomRoofFanIcon className='default-icon' /> }
}

export class FanIcon extends IconClass {
  activeIcon = (): JSX.Element => { return <ToysIcon className="spin" /> }
  inactiveIcon = (): JSX.Element => { return <ToysIcon className='default-icon' /> }
}

export class WaterpumpIcon extends IconClass {
  activeIcon = (): JSX.Element => { return <OpacityIcon className='waterpump-icon' /> }
  inactiveIcon = (): JSX.Element => { return <OpacityIcon className='default-icon' /> }
}
