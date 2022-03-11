import { ConfigType } from 'shared/@types/Config';

const { VITE_COUNTRIES_API, VITE_WEATHER_API_URL, VITE_WEATHER_API_KEY } = import.meta.env;

const config: ConfigType = {
	weatherApi: {
		key: `${VITE_WEATHER_API_KEY}`,
		baseUrl: `${VITE_WEATHER_API_URL}`
	},
	countryApi: {
		baseUrl: `${VITE_COUNTRIES_API}`
	}
};

export default config;
