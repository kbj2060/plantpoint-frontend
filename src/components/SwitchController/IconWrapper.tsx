import React from 'react';
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ToysIcon from "@material-ui/icons/Toys";
import OpacityIcon from "@material-ui/icons/Opacity";
import {AvailableMachines} from "@interfaces/main";
import '@styles/components/switch_controller.scss';
import '@styles/animations/fan_out.scss';
import useSubscribeSwitchStatus from "@hooks/useSubscribeSwitchStatus";

interface activeIconProps {
  active: boolean;
}

const CustomCoolerIcon = ({active}: activeIconProps) => {
  return active
    ? <AcUnitIcon className='cooler-icon'/>
    : <AcUnitIcon className='default-icon'/>
};

const CustomWhatshotIcon = ({active}: activeIconProps) => {
  return active
    ? <WhatshotIcon className='heater-icon' />
    : <WhatshotIcon className='default-icon' />
};

const CustomWbSunnyIcon = ({active}: activeIconProps) => {
  return active
    ? <WbSunnyIcon className='led-icon' />
    : <WbSunnyIcon className='default-icon' />
};

const CustomOpacityIcon = ({active}: activeIconProps) => {
  return active
    ? <OpacityIcon className='waterpump-icon' />
    : <OpacityIcon className='default-icon' />
};

const CustomToysIcon = ({active}: activeIconProps) => {
  return active
    ? <ToysIcon className="spin" />
    : <ToysIcon className='default-icon' />
};

interface IconWrapperProps {
  machine: AvailableMachines;
}

export default function IconWrapper({machine}: IconWrapperProps) {
  const isAnimated: boolean = useSubscribeSwitchStatus(machine) as boolean;

  function getIcon (machine: AvailableMachines, active: boolean): JSX.Element {
    const icons = {
      "cooler" : <CustomCoolerIcon active={active} />,
      "heater" : <CustomWhatshotIcon active={active} />,
      "led" : <CustomWbSunnyIcon active={active} />,
      "fan" : <CustomToysIcon active={active} />,
      "waterpump": <CustomOpacityIcon active={active} />
    }
    return icons[machine]
  }

  return isAnimated === undefined
          ? getIcon(machine as AvailableMachines, false)
          : getIcon(machine as AvailableMachines, isAnimated)
}
