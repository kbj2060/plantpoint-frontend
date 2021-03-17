import React from "react";
import '@styles/components/cctv.scss';
import {CAM_IP} from "../../reference/secret";

export default function CCTV () {
	return (
			<img alt={"cctv"} className='cctv'
					 src={CAM_IP}
					 width='100%' height='100%' /*muted autoPlay={true}*/ />
	)
}
