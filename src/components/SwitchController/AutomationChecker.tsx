import React from 'react';
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import {shallowEqual, useSelector} from "react-redux";
import {LocalStorageKeys} from "../../constants";
import {MachineProps} from "../../interfaces/ISwitch";
import '../../styles/components/switch_controller.scss';
import {RootState} from "../../redux/modules";

interface AutomationCheckerProp extends MachineProps {}
export default function AutomationChecker({machine}: AutomationCheckerProp): JSX.Element | null {
	const auto: any = useSelector((state: RootState) =>
		state[LocalStorageKeys.AUTO][machine].enable, shallowEqual)

	if (auto) {
		return <AllInclusiveIcon className='auto-icon'/>;
	} else {
		return null;
	}
}
