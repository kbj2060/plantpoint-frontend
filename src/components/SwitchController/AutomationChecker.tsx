import React from 'react';
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import {MachineProps} from "@interfaces/main";
import '@styles/components/switch_controller.scss';
import useSubscribeAutomationEnable from '@hooks/useSubscribeAutomationEnable';

interface AutomationCheckerProp extends MachineProps {}
export default function AutomationChecker({machine}: AutomationCheckerProp): JSX.Element | null {
	const check: boolean = useSubscribeAutomationEnable(machine);

	if (check) {
		return <AllInclusiveIcon className='auto-checker-icon'/>;
	} else {
		return null;
	}
}
