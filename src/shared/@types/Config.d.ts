type WeatherApiType = {
	key: string;
	baseUrl: string;
};

type CountryApiType = {
	baseUrl: string;
};

type ConfigType = {
	weatherApi: WeatherApiType;
	countryApi: CountryApiType;
};

export { ConfigType };
