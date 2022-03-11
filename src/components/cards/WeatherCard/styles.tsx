import { Card, CardContent, IconButton, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import cardBgImage from 'assets/media/backgrounds/mountain.jpg';

const WeatherCardContainer = styled(Card)(({ theme }) => ({
	borderRadius: '10px',

	backgroundImage: `url(${cardBgImage})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',

	backgroundColor: alpha(theme.palette.common.black, 0.5),
	backgroundBlendMode: 'overlay',

	boxShadow: theme.shadows[4],

	color: theme.palette.common.white
}));

const WeatherCardContent = styled(CardContent)(({ theme }) => ({
	position: 'relative',

	justifyContent: 'center',
	alignItems: 'center',

	padding: theme.spacing(4),

	color: theme.palette.common.white,
	textAlign: 'center'
}));

const WeatherIcon = styled('img')(({ theme }) => ({
	width: '80px',

	filter: `drop-shadow(0 0 4px ${theme.palette.common.white})`
}));

const InfoContainer = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	flexWrap: 'wrap',
	gap: theme.spacing(2),

	padding: theme.spacing(2),
	marginTop: theme.spacing(2),

	borderRadius: '15px',

	backgroundColor: alpha(theme.palette.common.white, 0.25),

	'& *': {
		textAlign: 'center'
	},

	[theme.breakpoints.down('md')]: {
		gap: theme.spacing(0),

		'& *': {
			flex: '0 1 50%'
		}
	}
}));

const MenuIconBtn = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	top: 4,
	right: 4,

	color: theme.palette.common.white
}));

export { WeatherCardContainer, WeatherCardContent, WeatherIcon, InfoContainer, MenuIconBtn };
