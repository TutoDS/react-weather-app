import CustomSnackbar from 'components/CustomSnackbar';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	SavedCityType,
	WeatherContextProps,
	WeatherContextProviderProps
} from 'shared/@types/WeatherContext';
import { CityResponseType } from 'shared/@types/WeatherResponses';
import useSnackbar from 'shared/hooks/useSnackbar';
import weatherApi from 'shared/services/weather/weatherApi';

const WeatherContext = createContext({} as WeatherContextProps);

const WeatherContextProvider = ({ children }: WeatherContextProviderProps) => {
	const navigate = useNavigate();

	// Snackbar hook
	const { snackbar, openSnackbar, closeSnackbar } = useSnackbar();

	// Saved Cities
	const [cities, setCities] = useState<SavedCityType[]>([]);

	// Use Effect to get cities from local storage
	useEffect(() => {
		const savedCities = localStorage.getItem('cities');

		if (savedCities) {
			setCities(JSON.parse(savedCities));
		} else {
			// If not have any cities, add Leiria as default
			const defaultCity: SavedCityType = {
				name: 'Leiria',
				country: 'PT',
				coordinates: {
					lat: 39.7437902,
					long: -8.8071119
					// this coordinates are from http://api.openweathermap.org/geo/1.0/direct?q=leiria,pt&limit=1&appid=<key>
				}
			};

			// Save on state and local storage
			setCities([defaultCity]);
			localStorage.setItem('cities', JSON.stringify([defaultCity]));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cities', JSON.stringify([...cities]));
	}, [cities]);

	const addCity = async (city: Omit<SavedCityType, 'coordinates'>) => {
		try {
			if (
				cities.filter(
					(savedCity) =>
						savedCity.name.includes(city.name) && savedCity.country === city.country
				).length > 0
			) {
				throw new Error('City already exists');
			}

			// Get coordinates to new city
			const { data } = await weatherApi.get<CityResponseType>('geo/1.0/direct', {
				params: {
					limit: 1,
					q: `${city.name},${city.country}`
				}
			});

			// Storage new city
			setCities((prevState) => [
				...prevState,
				{
					...city,
					coordinates: {
						lat: data[0].lat,
						long: data[0].lon
					}
				}
			]);
		} catch (error: any) {
			return Promise.reject(error);
		}
	};

	const removeCity = (city: SavedCityType) => {
		setCities((prevState) => {
			const cityToRemove = prevState.filter(
				(savedCity) =>
					savedCity.name.includes(city.name) && savedCity.country == city.country
			);

			if (cityToRemove.length === 0) {
				throw new Error('This city not belongs to your tracked cities!');
			}

			return prevState.filter((city) => city !== cityToRemove[0]);
		});

		openSnackbar('City removed with success!', 'success');

		// Redirect user to home page
		navigate('/');
	};

	return (
		<WeatherContext.Provider value={{ cities, addCity, removeCity }}>
			<CustomSnackbar
				message={snackbar.message}
				isOpen={snackbar.isOpen}
				onClose={closeSnackbar}
				status={snackbar.status}
			/>

			{children}
		</WeatherContext.Provider>
	);
};

export { WeatherContext, WeatherContextProvider };
