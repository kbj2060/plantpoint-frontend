import {AvailableMachines, MachineProps} from "@interfaces/main";
import '@styles/components/switch_controller.scss';
import '@styles/animations/fan_out.scss';
import useSubscribeSwitchStatus from "@hooks/useSubscribeSwitchStatus";
import {CoolerIcon, FanIcon, HeaterIcon, LEDIcon, RoofFanIcon, WaterpumpIcon} from "@interfaces/Icon.class";

interface IconWrapperProps extends MachineProps {}
export default function IconWrapper({machine}: IconWrapperProps) {
  const isAnimated: boolean = useSubscribeSwitchStatus(machine) as boolean;

  function getIcon (machine: AvailableMachines, active: boolean): JSX.Element {
    const icons = {
      "cooler" : new CoolerIcon().iconHandler(active),
      "heater" : new HeaterIcon().iconHandler(active),
      "led" : new LEDIcon().iconHandler(active),
      "fan" : new FanIcon().iconHandler(active),
      "roofFan" : new RoofFanIcon().iconHandler(active),
      "waterpump": new WaterpumpIcon().iconHandler(active),
    }
    return icons[machine]
  }

  return isAnimated === undefined
          ? getIcon(machine as AvailableMachines, false)
          : getIcon(machine as AvailableMachines, isAnimated)
}
