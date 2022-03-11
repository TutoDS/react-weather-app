import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Menu, MenuItem, SxProps, Typography } from '@mui/material';
import RemoveCityDrawer from 'components/drawers/RemoveCityDrawer';
import LightTooltip from 'components/tooltips/LightTooltip';
import { MouseEvent, useState } from 'react';
import { SavedCityType } from 'shared/@types/WeatherContext';
import { CurrentWeatherType } from 'shared/@types/WeatherResponses';
import { getWeatherIcon } from 'shared/services/weather/weatherService';
import capitalizeString from 'shared/utils/capitalizeString';
import { getByTimestamp, getTimestampWeekDay } from 'shared/utils/timestampUtils';
import { getInfoFromCurrent } from 'shared/utils/transformWeather';
import WeatherInfoModal from '../InfoModal';
import {
	InfoContainer,
	MenuIconBtn,
	WeatherCardContainer,
	WeatherCardContent,
	WeatherIcon
} from './styles';

type Props = {
	sx?: SxProps;
	city: SavedCityType;
	weather: CurrentWeatherType;
};

const CityWeatherCard = ({ city, weather, sx, ...props }: Props) => {
	// Menu state
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);

	// Modal state
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Remove Drawer State
	const [isRemoveDrawerOpen, setIsRemoveDrawerOpen] = useState(false);

	// Menu Handlers
	const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	// Handle Modal State
	const handleModalState = () => setIsModalOpen((prevState) => !prevState);

	// Handle Remove Drawer State
	const handleRemoveDrawerState = () => setIsRemoveDrawerOpen((prevState) => !prevState);

	return (
		<>
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
						<MenuItem onClick={handleModalState}>View Details</MenuItem>
						<MenuItem onClick={handleRemoveDrawerState}>Remove City</MenuItem>
					</Menu>

					<Typography variant={'subtitle2'} fontWeight={'bold'}>
						{getTimestampWeekDay(weather.dt)}
					</Typography>
					<Typography variant={'body1'}>{getByTimestamp(weather.dt)}</Typography>

					{weather.weather[0] && (
						<LightTooltip title={weather.weather[0].main} placement={'top'} arrow>
							<WeatherIcon
								src={getWeatherIcon(weather.weather[0].icon)}
								alt={weather.weather[0].description}
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
					{weather.weather[0] && (
						<Typography variant="body2" sx={{}}>
							{capitalizeString(weather.weather[0].description)}
						</Typography>
					)}

					<InfoContainer direction={'row'} spacing={2}>
						<Box>
							<Typography variant={'caption'}>Current Temp.</Typography>
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
			<WeatherInfoModal
				isOpen={isModalOpen}
				onClose={handleModalState}
				weather={getInfoFromCurrent(weather)}
			/>
			<RemoveCityDrawer
				isOpen={isRemoveDrawerOpen}
				onClose={handleRemoveDrawerState}
				city={city}
			/>
		</>
	);
};

export default CityWeatherCard;
