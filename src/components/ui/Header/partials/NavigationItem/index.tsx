import { Button, SxProps } from '@mui/material';
import { ReactNode } from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';

type Props = {
	darkColors?: boolean;
	path: string;
	children: ReactNode;
	sx?: SxProps;
};

const NavigationItem = ({ path, children, darkColors = true, sx, ...props }: Props) => {
	const { pathname } = useLocation();

	const isActive = !!matchPath(pathname, path);

	const activeStyling = {
		color: darkColors ? 'common.white' : 'primary.main',
		borderColor: darkColors ? 'common.white' : 'primary.main'
	};

	const nonActiveStyling = {
		color: darkColors ? 'common.white' : 'text.primary'
	};

	const styling = {
		...sx,

		borderBottomWidth: '2px',
		borderStyle: 'solid',
		borderRadius: 0,
		borderColor: 'transparent',

		transition: 'all 0.2s ease-in-out',

		'&:hover': {
			borderColor: darkColors ? 'common.white' : 'primary.main'
		}
	};

	return (
		<Button
			{...props}
			sx={{
				...styling,
				...(isActive ? activeStyling : nonActiveStyling)
			}}
			variant={'text'}
			component={RouterLink}
			to={path}
		>
			{children}
		</Button>
	);
};

export default NavigationItem;
