import { Stack, SxProps, Typography } from '@mui/material';
import LightTooltip from 'components/tooltips/LightTooltip';
import { useState } from 'react';
import { DailyWeatherType } from 'shared/@types/WeatherResponses';
import { getWeatherIcon } from 'shared/services/weather/weatherService';
import { getByTimestamp, getTimestampWeekDay } from 'shared/utils/timestampUtils';
import { getInfoFromDaily } from 'shared/utils/transformWeather';
import WeatherInfoModal from '../InfoModal';
import { InfoContainer, WeatherCardContainer, WeatherCardContent, WeatherIcon } from './styles';

type Props = {
	weather: DailyWeatherType;
	sx?: SxProps;
};

const DailyCard = ({ weather, sx, ...props }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalState = () => setIsModalOpen((prevState) => !prevState);

	return (
		<>
			<WeatherCardContainer onClick={handleModalState} sx={{ ...sx }}>
				<WeatherCardContent>
					<Typography variant={'subtitle2'} fontWeight={'bold'}>
						{getTimestampWeekDay(weather?.dt)}
					</Typography>
					<Typography variant={'body1'}>{getByTimestamp(weather?.dt)}</Typography>

					<LightTooltip title={weather?.weather[0].main} placement={'top'} arrow>
						<WeatherIcon
							src={getWeatherIcon(weather?.weather[0].icon)}
							alt={weather?.weather[0].description}
						/>
					</LightTooltip>

					<Stack alignItems={'center'} justifyContent={'center'}>
						<InfoContainer>
							<LightTooltip
								title={'Current Temperature'}
								arrow
								placement={'top'}
								sx={{ cursor: 'pointer' }}
							>
								<Typography variant={'subtitle1'} fontWeight={'bold'}>
									{Math.round(weather?.temp.day)} ºC
								</Typography>
							</LightTooltip>

							<LightTooltip title={'Minimum Temperature'} arrow placement={'bottom'}>
								<Typography
									variant={'body2'}
									fontWeight={500}
									color={'grey.300'}
									sx={{ cursor: 'pointer' }}
								>
									{Math.round(weather?.temp.min)} <small>ºC</small>
								</Typography>
							</LightTooltip>
						</InfoContainer>
					</Stack>
				</WeatherCardContent>
			</WeatherCardContainer>
			<WeatherInfoModal
				isOpen={isModalOpen}
				onClose={handleModalState}
				weather={getInfoFromDaily(weather)}
			/>
		</>
	);
};

export default DailyCard;
