import { AppBar, Container, Hidden, Link, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import DesktopNavigation from './partials/DesktopNavigation';
import ElevationScroll from './partials/ElevationScroll';
import MobileNavigation from './partials/MobileNavigation';

type Props = {};

const Header = ({ ...props }: Props) => {
	return (
		<ElevationScroll>
			<AppBar
				{...props}
				sx={{
					flexGrow: 1,
					paddingX: 0
					// boxShadow: 2
				}}
				position={'sticky'}
				component={'header'}
				color={'primary'}
				enableColorOnDark
			>
				<Container maxWidth={'lg'}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: '1rem'
						}}
					>
						<Link component={RouterLink} sx={{ color: 'common.white' }} to={'/'}>
							<Typography fontWeight={'bold'}>React Weather App</Typography>
						</Link>

						<Hidden mdDown>
							<DesktopNavigation />
						</Hidden>

						<Hidden mdUp>
							<MobileNavigation />
						</Hidden>
					</Toolbar>
				</Container>
			</AppBar>
		</ElevationScroll>
	);
};

export default Header;
