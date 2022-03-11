import { Grid, Stack, Typography } from '@mui/material';
import CustomSnackbar from 'components/CustomSnackbar';
import Loading from 'components/ui/Loading';
import DailyCard from 'pages/CityWeather/partials/DayCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SavedCityType } from 'shared/@types/WeatherContext';
import { OneCityCallResponseType } from 'shared/@types/WeatherResponses';
import useSnackbar from 'shared/hooks/useSnackbar';
import { getCityCoordinates, getOneCallCityWeather } from 'shared/services/weather/weatherService';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import CityWeatherCard from './partials/MainCard';

const CityWeather = () => {
	// Router Params
	let { country, city } = useParams();

	// Get cities from context
	// const { cities } = useWeather();

	// Snackbar hook
	const { snackbar, openSnackbar, closeSnackbar } = useSnackbar();

	// Current City Details
	const [currentCity, setCurrentCity] = useState<SavedCityType>();
	const [weather, setWeather] = useState<OneCityCallResponseType>();

	// Loading State
	const [isLoading, setIsLoading] = useState(true);

	// Get weather from city
	const getWeatherData = async () => {
		// If you want not allow get weather to cities without tracking, remove the comments on else if
		if (!currentCity) {
			return;
		}
		// else if (
		// 	cities.filter(
		// 		(savedCity) =>
		// 			savedCity.name.includes(currentCity.name) &&
		// 			savedCity.country === currentCity.country
		// 	).length === 0
		// ) {
		// 	openSnackbar("You don't have this city on your tracking list!");
		// 	navigate('/');

		// 	return;
		// }

		setIsLoading(true);
		try {
			const data = await getOneCallCityWeather(
				currentCity?.coordinates.lat,
				currentCity?.coordinates.long
			);

			setWeather(data);
		} catch (error) {
			openSnackbar("Could't get weather data. Please try again later.");
		}

		setIsLoading(false);
	};

	// Filter cities
	const getCityInfo = async () => {
		try {
			setIsLoading(true);

			const cityInfo = await getCityCoordinates(city!, country!);

			// Save info on current city
			setCurrentCity({
				name: cityInfo[0].name || cityInfo[0].local_names.en,
				country: cityInfo[0].country,
				coordinates: {
					lat: cityInfo[0].lat,
					long: cityInfo[0].lon
				}
			});

			setIsLoading(false);
		} catch (error) {
			openSnackbar("Couldn't get weather data. Please try again later.");
		}
	};

	// Use Effect to get the city info
	useEffect(() => {
		getCityInfo();

		return () => setCurrentCity(undefined);
	}, []);

	// Use Effect to get weather data
	useEffect(() => {
		getWeatherData();

		return () => setWeather(undefined);
	}, [currentCity]);

	return (
		<>
			<CustomSnackbar
				message={snackbar.message}
				isOpen={snackbar.isOpen}
				onClose={closeSnackbar}
				status={snackbar.status}
			/>

			{isLoading && <Loading />}

			{!isLoading && currentCity && weather && (
				<Stack direction={'column'} sx={{ gap: 2 }}>
					<Typography
						variant={'h6'}
						component={'h2'}
						fontWeight={'300'}
						textAlign={'center'}
					>
						Weather forecast for the next <strong>7 days</strong>
					</Typography>

					<Grid container spacing={4}>
						<Grid item xs={12} md={4}>
							<CityWeatherCard city={currentCity} weather={weather!.current} />
						</Grid>
						<Grid item xs={12} md={8}>
							<Swiper
								slidesPerView={4}
								spaceBetween={20}
								grabCursor
								navigation
								modules={[Navigation]}
							>
								{weather.daily.slice(1, 8).map((daily) => (
									<SwiperSlide key={daily.dt}>
										<DailyCard weather={daily} />
									</SwiperSlide>
								))}
							</Swiper>

							<Typography variant={'body2'} sx={{ mt: 2 }} color={'grey.600'}>
								<strong>Note:</strong> for further details of a specific day, click
								on the card.
							</Typography>
						</Grid>
					</Grid>
				</Stack>
			)}

			{!currentCity && !weather && (
				<>
					<Typography variant={'h6'} textAlign={'center'}>
						In the moment, is not possible show information about this city.
					</Typography>
					<Typography variant={'subtitle1'}>
						Please try again later or try with different city!
					</Typography>
				</>
			)}
		</>
	);
};

export default CityWeather;
