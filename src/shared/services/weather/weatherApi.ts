import axios from 'axios';
import config from 'shared/utils/config';

const weatherApi = axios.create({
	baseURL: config.weatherApi.baseUrl,
	params: {
		appid: config.weatherApi.key
	}
});

export default weatherApi;
