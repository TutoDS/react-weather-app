import { WeatherContext } from 'contexts/WeatherContext';
import { useContext } from 'react';
import { WeatherContextProps } from 'shared/@types/WeatherContext';

const useWeather = (): WeatherContextProps => {
	const context = useContext(WeatherContext);

	return context;
};

export default useWeather;
