import { Card, CardContent, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import cardBgImage from 'assets/media/backgrounds/mountain.jpg';

const WeatherCardContainer = styled(Card)(({ theme }) => ({
	flex: '1 1 25%',

	[theme.breakpoints.down('md')]: {
		flex: '0 1 33.33%'
	},

	[theme.breakpoints.down('sm')]: {
		flex: '0 1 50%'
	},

	borderRadius: '10px',

	backgroundImage: `url(${cardBgImage})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',

	backgroundColor: alpha(theme.palette.common.black, 0.5),
	backgroundBlendMode: 'overlay',

	boxShadow: theme.shadows[2],

	color: theme.palette.common.white,

	transition: 'all 0.25s ease-in-out',
	cursor: 'pointer',

	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.75)
	}
}));

const WeatherCardContent = styled(CardContent)(({ theme }) => ({
	position: 'relative',

	justifyContent: 'center',
	alignItems: 'center',

	padding: `${theme.spacing(4)} ${theme.spacing(2)}`,

	color: theme.palette.common.white,
	textAlign: 'center'
}));

const WeatherIcon = styled('img')(({ theme }) => ({
	width: '60px',

	filter: `drop-shadow(0 0 1px ${theme.palette.common.white})`
}));

const InfoContainer = styled(Stack)(({ theme }) => ({
	justifyContent: 'center',
	flexWrap: 'wrap',

	padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
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

export { WeatherCardContainer, WeatherCardContent, WeatherIcon, InfoContainer };
