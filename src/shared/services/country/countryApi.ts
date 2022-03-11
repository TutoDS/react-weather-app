import axios from 'axios';
import config from 'shared/utils/config';

const countryApi = axios.create({
	baseURL: config.countryApi.baseUrl
});

export default countryApi;
