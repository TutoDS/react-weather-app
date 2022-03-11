import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import CustomSnackbar from 'components/CustomSnackbar';
import RemoveCityDrawer from 'components/drawers/RemoveCityDrawer';
import LightTooltip from 'components/tooltips/LightTooltip';
import { MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SavedCityType } from 'shared/@types/WeatherContext';
import { CurrentWeatherType } from 'shared/@types/WeatherResponses';
import useSnackbar from 'shared/hooks/useSnackbar';
import { getOneCallCityWeather, getWeatherIcon } from 'shared/services/weather/weatherService';
import capitalizeString from 'shared/utils/capitalizeString';
import { getByTimestamp, getTimestampWeekDay } from 'shared/utils/timestampUtils';

import {
	InfoContainer,
	MenuIconBtn,
	WeatherCardContainer,
	WeatherCardContent,
	WeatherIcon
} from './styles';

type Props = {
	city: SavedCityType;
};

const WeatherCard = ({ city, ...props }: Props) => {
	// Snackbar hook
	const { snackbar, openSnackbar, closeSnackbar } = useSnackbar();

	// Menu state
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);

	// Weather State
	const [weather, setWeather] = useState<CurrentWeatherType>();

	// Remove Drawer State
	const [isRemoveDrawerOpen, setIsRemoveDrawerOpen] = useState(false);

	// Get weather from city
	const getWeatherData = async () => {
		try {
			const data = await getOneCallCityWeather(city.coordinates.lat, city.coordinates.long);

			setWeather(data.current);
		} catch (error) {
			openSnackbar(`Couldn't get weather data. Please try again later.`);
		}
	};

	useEffect(() => {
		getWeatherData();
	}, []);

	// Menu Handlers
	const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	// Handle Remove Drawer State
	const handleRemoveDrawerState = () => setIsRemoveDrawerOpen((prevState) => !prevState);

	return (
		<>
			<CustomSnackbar
				isOpen={snackbar.isOpen}
				message={snackbar.message}
				status={snackbar.status}
				onClose={closeSnackbar}
			/>
			{weather && (
				<WeatherCardContainer {...props}>
					<WeatherCardContent>
						<MenuIconBtn
							aria-label="Weather Card Options"
							onClick={handleOpenMenu}
							aria-controls={isMenuOpen ? 'card-menu' : undefined}
							aria-haspopup={'true'}
							aria-expanded={isMenuOpen ? 'true' : undefined}
						>
							<MoreVertIcon />
						</MenuIconBtn>
						<Menu
							anchorEl={anchorEl}
							id={'card-menu'}
							open={isMenuOpen}
							onClose={handleCloseMenu}
							onClick={handleCloseMenu}
						>
							<MenuItem
								component={Link}
								to={`/${city.country.toLowerCase()}/${city.name.toLowerCase()}`}
							>
								View Weather
							</MenuItem>
							<MenuItem onClick={handleRemoveDrawerState}>Remove City</MenuItem>
						</Menu>

						<Typography variant={'subtitle2'} fontWeight={'bold'}>
							{getTimestampWeekDay(weather.dt)}
						</Typography>
						<Typography variant={'body1'}>{getByTimestamp(weather.dt)}</Typography>

						{weather?.weather[0] && (
							<LightTooltip title={weather?.weather[0].main} placement={'top'} arrow>
								<WeatherIcon
									src={getWeatherIcon(weather?.weather[0].icon)}
									alt={weather?.weather[0].description}
								/>
							</LightTooltip>
						)}
						<Typography variant="h5" component="div">
							{city.name} {''}
							<Typography
								component={'sup'}
								variant={'overline'}
								fontWeight={'bold'}
								sx={{
									backgroundColor: 'secondary.main',
									px: 1,
									borderRadius: 4
								}}
							>
								{city.country}
							</Typography>
						</Typography>
						{weather?.weather[0] && (
							<Typography variant="body2" sx={{}}>
								{capitalizeString(weather?.weather[0].description)}
							</Typography>
						)}

						<InfoContainer direction={'row'}>
							<Box>
								<Typography variant={'caption'}>Current Temp.</Typography>
								<Typography variant={'subtitle1'} fontWeight={'bold'}>
									{Math.round(weather.temp)} ºC
								</Typography>
							</Box>
							<Box>
								<Typography variant={'caption'}>Feels Like</Typography>
								<Typography variant={'subtitle1'} fontWeight={'bold'}>
									{Math.round(weather?.feels_like)} ºC
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
			)}
			<RemoveCityDrawer
				isOpen={isRemoveDrawerOpen}
				onClose={handleRemoveDrawerState}
				city={city}
			/>
		</>
	);
};

export default WeatherCard;
