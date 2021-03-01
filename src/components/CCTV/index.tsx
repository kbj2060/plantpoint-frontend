import React from "react";
import '@styles/components/cctv.scss';

export default function CCTV () {
	return (
			<img alt={"cctv"} className='cctv'
					 src={process.env.PUBLIC_URL + '/sample.png'}
					 width='100%' height='100%' /*muted autoPlay={true}*/ />
	)
}
