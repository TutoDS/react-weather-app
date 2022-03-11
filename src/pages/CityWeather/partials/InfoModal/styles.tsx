import { Card, CardContent, Stack, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';
import cardBgImage from 'assets/media/backgrounds/mountain.jpg';

const ModalContent = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',

	transform: 'translate(-50%, -50%)',

	padding: theme.spacing(4),

	width: '50vw',

	borderRadius: '10px',
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[4],

	outline: 'none',

	[(theme.breakpoints.down('md'), theme.breakpoints.down('lg'))]: {
		width: '65vw'
	},

	[theme.breakpoints.down('sm')]: {
		width: '85vw',
		height: '95vh',
		overflowY: 'auto'
	}
}));

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

	padding: theme.spacing(2),
	marginTop: theme.spacing(2),

	borderRadius: '15px',

	backgroundColor: alpha(theme.palette.common.white, 0.25),

	'& *': {
		textAlign: 'center'
	},

	[theme.breakpoints.down('md')]: {
		'& *': {
			flex: '0 1 50%'
		}
	}
}));

export { ModalContent, WeatherCardContainer, WeatherCardContent, WeatherIcon, InfoContainer };
