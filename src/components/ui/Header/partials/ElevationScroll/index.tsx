import { useScrollTrigger } from '@mui/material';
import { cloneElement, ReactElement } from 'react';

type Props = {
	children: ReactElement<any, any>;
};

const ElevationScroll = ({ children }: Props) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
};

export default ElevationScroll;
