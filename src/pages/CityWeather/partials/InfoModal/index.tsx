import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloudsIcon from 'components/icons/Clouds';
import RainIcon from 'components/icons/Rain';
import WindIcon from 'components/icons/Wind';
import LightTooltip from 'components/tooltips/LightTooltip';
import {
	InfoContainer,
	ModalContent,
	WeatherCardContainer,
	WeatherCardContent,
	WeatherIcon
} from 'pages/CityWeather/partials/InfoModal/styles';
import { AdditionalWeatherType } from 'shared/@types/AdditionalWeather';
import { getWeatherIcon } from 'shared/services/weather/weatherService';
import capitalizeString from 'shared/utils/capitalizeString';
import { getByTimestamp, getTimestampWeekDay } from 'shared/utils/timestampUtils';

type Props = {
	weather: AdditionalWeatherType;
	isOpen: boolean;
	onClose: () => void;
};

const WeatherInfoModal = ({ weather, isOpen, onClose, ...props }: Props) => {
	return (
		<Modal
			{...props}
			keepMounted
			open={isOpen}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<ModalContent spacing={2}>
				<Stack
					direction={'row'}
					alignItems={'center'}
					spacing={2}
					justifyContent={'space-between'}
				>
					<Typography component={'h2'} variant={'h5'} fontWeight={'300'}>
						Weather Info for <strong>{getByTimestamp(weather.dt, 'MMMM dd')}th</strong>
					</Typography>

					<IconButton sx={{ color: 'primary.main' }} size={'medium'} onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Grid container>
					<Grid item xs={12} md={6}>
						<WeatherCardContainer {...props}>
							<WeatherCardContent>
								<Typography variant={'subtitle1'} fontWeight={'bold'}>
									{getTimestampWeekDay(weather.dt)}
								</Typography>
								<Typography variant={'body1'}>
									{getByTimestamp(weather.dt)}
								</Typography>

								{weather.weather[0] && (
									<LightTooltip
										title={weather.weather[0].main}
										placement={'top'}
										arrow
									>
										<WeatherIcon
											src={getWeatherIcon(weather.weather[0].icon)}
											alt={weather.weather[0].description}
										/>
									</LightTooltip>
								)}

								{weather.weather[0] && (
									<Typography variant="body2" sx={{}}>
										{capitalizeString(weather.weather[0].description)}
									</Typography>
								)}

								<InfoContainer direction={'row'} spacing={2}>
									<Box>
										<Typography variant={'caption'}>Temperature</Typography>
										<Typography variant={'subtitle1'} fontWeight={'bold'}>
											{Math.round(weather.temp)} ºC
										</Typography>
									</Box>
									<Box>
										<Typography variant={'caption'}>Feels Like</Typography>
										<Typography variant={'subtitle1'} fontWeight={'bold'}>
											{Math.round(weather.feels_like)} ºC
										</Typography>
									</Box>
									<Box>
										<Typography variant={'caption'}>Humidity</Typography>
										<Typography variant={'subtitle1'} fontWeight={'bold'}>
											{Math.round(weather.humidity)}%
										</Typography>
									</Box>
								</InfoContainer>
							</WeatherCardContent>
						</WeatherCardContainer>
					</Grid>
					<Grid item xs={12} md={6} sx={{ paddingLeft: 4 }}>
						<Stack direction={'row'} spacing={1} alignItems={'center'} sx={{ pt: 2 }}>
							<WindIcon sx={{ fontSize: '4rem', color: 'primary.main' }} />
							<Box>
								<Typography variant={'subtitle1'} fontWeight={'bold'}>
									Wind
								</Typography>

								<Typography variant={'body2'} color={'grey.600'}>
									<strong>Velocity:</strong> {Math.round(weather.wind_speed)} km/h
								</Typography>
								<Typography variant={'body2'} color={'grey.600'}>
									<strong>Direction:</strong> {Math.round(weather.wind_deg)}º
								</Typography>
							</Box>
						</Stack>

						<Stack direction={'row'} spacing={1} alignItems={'center'} sx={{ pt: 2 }}>
							<RainIcon
								sx={{
									fontSize: '4rem',
									color: 'primary.main'
								}}
							/>
							<Box>
								<Typography variant={'subtitle1'} fontWeight={'bold'}>
									Rain
								</Typography>

								<Typography variant={'body2'} color={'grey.600'}>
									<strong>Percentage:</strong> {weather.rain} %
								</Typography>
							</Box>
						</Stack>

						<Stack direction={'row'} spacing={1} alignItems={'center'} sx={{ pt: 2 }}>
							<CloudsIcon sx={{ fontSize: '4rem', color: 'primary.main' }} />
							<Box>
								<Typography variant={'subtitle1'} fontWeight={'bold'}>
									Clouds
								</Typography>

								<Typography variant={'body2'} color={'grey.600'}>
									<strong>Percentage:</strong> {weather.clouds} %
								</Typography>
							</Box>
						</Stack>
					</Grid>
				</Grid>
			</ModalContent>
		</Modal>
	);
};

export default WeatherInfoModal;
