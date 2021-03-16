import React, {useEffect} from 'react';
import axios from "axios";
import {checkEmpty} from "@funcUtils/checkEmpty";
import {MachineProps} from "@interfaces/main";
import {HttpUrls, Reports} from "../../constants";
import { ResponseCurrentRead } from "@interfaces/Current";
import {currentPage} from "@funcUtils/currentPage";
import {Loader} from "@compUtils/Loader";

interface CurrentFlowingProps {
	fillColor: string;
}

const CurrentFlowing = ({ fillColor }: CurrentFlowingProps) => {
	return (
		<svg className='current-icon' fill={fillColor} x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
			<g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
				<path d="M4019.2,2676.1L2377.6,340l1119.5-10.8l1119.5-10.8L3063.6-2205.4c-854.2-1387-1563.9-2543.2-1576.8-2566.9c-15.1-30.2,0-21.6,49.6,23.7c41,36.7,1300.7,1197.2,2802,2577.7C5839.7-790.3,7392.8,637.6,7789.7,1004.3c396.9,364.6,724.8,673,729.1,686c4.3,10.8-498.3,21.6-1287.8,23.7l-1296.4,6.5l1121.7,1632.9c616.9,897.3,1121.7,1637.2,1121.7,1643.7c0,6.5-565.1,12.9-1257.5,12.9H5662.8L4019.2,2676.1z"/></g></g>
		</svg>
	)
}

interface CurrentCheckerProps extends MachineProps { }
export default function CurrentChecker({machine}: CurrentCheckerProps) {
	const [flowing, setFlowing] = React.useState<boolean>(false);
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

	useEffect(() => {
		const {Criteria, UpdateTimeOut} = require('@values/defaults')
		const fetchCurrent = async () => {
			const machineSection = currentPage();
			await axios.get(`${HttpUrls.CURRENT_READ}/${machineSection}/${machine}`)
				.then(({ data }) => {
					const {current}: ResponseCurrentRead = data;
					if(checkEmpty(current) || current < Criteria.current){
						setFlowing(false);
					}
					else {
						setFlowing(true);
					}
					setIsLoaded(true);
			})
		}

		fetchCurrent().then(() => Reports.CURRENT_LOADED);
		const interval = setInterval(() => {
			fetchCurrent().then(() => Reports.CURRENT_LOADED);
		}, parseInt(UpdateTimeOut.current));

		return () => {
			clearInterval(interval);
			setIsLoaded(false);
			setFlowing(false);
		}
	}, [machine]);

	if (!isLoaded) { return <Loader />}
	if (!flowing) { return <></> }

	return <CurrentFlowing fillColor={'#F6BD60'}/>
}
