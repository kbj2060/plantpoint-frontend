import { MachineProps} from "@interfaces/main";
import '@styles/components/switch_controller.scss';
import '@styles/animations/fan_out.scss';
import useSubscribeSwitchStatus from "@hooks/useSubscribeSwitchStatus";
import {getMachine} from "../../handler/classHandler";

interface IconWrapperProps extends MachineProps {}
export default function IconWrapper({machine}: IconWrapperProps) {
  const isAnimated: boolean = useSubscribeSwitchStatus(machine) as boolean;

  function getIcon (active: boolean): JSX.Element {
    const machineObject = getMachine(machine);
    return new machineObject().getIcon(active) as JSX.Element
  }

  return isAnimated === undefined
          ? getIcon(false)
          : getIcon(isAnimated)
}
