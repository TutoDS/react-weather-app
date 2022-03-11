import { Container } from '@mui/material';
import Header from 'components/ui/Header';
import { WeatherContextProvider } from 'contexts/WeatherContext';
import CityWeather from 'pages/CityWeather';
import Home from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = () => {
	return (
		<BrowserRouter>
			<Header />
			<Container maxWidth={'lg'} sx={{ paddingY: 2 }}>
				<WeatherContextProvider>
					<Routes>
						<Route index element={<Home />} />

						<Route path={'/:country/:city'} element={<CityWeather />} />
					</Routes>
				</WeatherContextProvider>
			</Container>
		</BrowserRouter>
	);
};

export default Main;
