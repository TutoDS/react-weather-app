import { CitiesResponseType, CountriesResponseType } from 'shared/@types/CountriesResponse';
import countryApi from './countryApi';

const getCountryCities = async (country: string): Promise<CitiesResponseType> => {
	try {
		const { data } = await countryApi.post<CitiesResponseType>('countries/cities', {
			country
		});
		return data;
	} catch (error: any) {
		return Promise.reject(error);
	}
};

const getCountries = async (): Promise<CountriesResponseType> => {
	try {
		const { data } = await countryApi.get<CountriesResponseType>('countries');

		return data;
	} catch (error: any) {
		return Promise.reject(error);
	}
};

export { getCountryCities, getCountries };
