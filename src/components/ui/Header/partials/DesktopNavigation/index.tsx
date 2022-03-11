import { Box } from '@mui/material';

import NavigationItem from '../NavigationItem';

type Props = {};

const DesktopNavigation = ({ ...props }: Props) => {
	return (
		<Box
			{...props}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				gap: '1rem'
			}}
		>
			<NavigationItem path={'/'}>Home</NavigationItem>
		</Box>
	);
};

export default DesktopNavigation;
