import { useEffect, useState } from 'react';
import { formatNumber } from '../Tools';

// const easeOutQuad = t => t * ( 2 - t );
// function easeInSine(x){
//     return 1 - Math.cos((x * Math.PI) / 2);
// }
function easeOutSine(x){
	return Math.sin((x * Math.PI) / 2);
  }
const frameDuration = 1000 / 60;

export default function CountUpAnimation ( {num , temp=100} ) {
	const countTo = num 
	const [ count, setCount ] = useState( 0 );

	useEffect( () => {
		let frame = 0;
		const totalFrames = Math.round( temp / frameDuration );
		const counter = setInterval( () => {
			frame++;
			const progress = easeOutSine( frame / totalFrames );
			setCount( countTo * progress );
			if ( frame === totalFrames ) {
				clearInterval( counter );
			}
		}, frameDuration );
	}, [num] ) // eslint-disable-line react-hooks/exhaustive-deps

	return formatNumber(count,1)
};
