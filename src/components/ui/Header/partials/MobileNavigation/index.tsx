import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Stack, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';

import NavigationItem from '../NavigationItem';

type Props = {};

const MobileNavigation = ({ ...props }: Props) => {
	// Improve performance on iOS
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleToggle = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<>
			<IconButton {...props} onClick={handleToggle} sx={{ color: 'common.white' }}>
				{isOpen ? <CloseIcon /> : <MenuIcon />}
			</IconButton>

			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				PaperProps={{
					sx: { width: '75%', backgroundColor: 'background.paper' }
				}}
				open={isOpen}
				onClose={handleToggle}
				onOpen={handleToggle}
				ModalProps={{
					keepMounted: true
				}}
				anchor={'right'}
			>
				<Stack
					spacing={2}
					direction={'row'}
					sx={{
						padding: 2,
						alignItems: 'center',
						justifyContent: 'flex-end'
					}}
				>
					{/* <Logo sx={{ width: '150px' }} /> */}
					<IconButton size={'medium'} onClick={handleToggle}>
						<CloseIcon />
					</IconButton>
				</Stack>

				<Stack direction={'column'} spacing={2} sx={{ p: 2 }} alignItems={'start'}>
					<NavigationItem darkColors={false} path={'/'}>
						Home
					</NavigationItem>
				</Stack>
			</SwipeableDrawer>
		</>
	);
};

export default MobileNavigation;
