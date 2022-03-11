import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Button, Grid, Stack, Typography } from '@mui/material';
import WeatherCard from 'components/cards/WeatherCard';
import AddCityDrawer from 'components/drawers/AddCityDrawer';
import { useState } from 'react';
import useWeather from 'shared/hooks/useWeather';

const Home = () => {
	const { cities } = useWeather();

	// Add City Modal States
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

	const handleAddModalState = () => setAddModalOpen((prevState) => !prevState);

	return (
		<main>
			<Stack
				component={'section'}
				direction={'row'}
				spacing={2}
				alignItems={'center'}
				justifyContent={'space-between'}
				sx={{ mb: 2 }}
			>
				<Typography fontWeight={'bold'} variant={'h5'}>
					Tracked Cities
				</Typography>

				<Button
					onClick={handleAddModalState}
					variant={'outlined'}
					startIcon={<AddLocationAltIcon />}
				>
					Add City
				</Button>
				<AddCityDrawer isOpen={addModalOpen} onClose={handleAddModalState} />
			</Stack>

			{cities.length > 0 && (
				<Grid container spacing={2}>
					{cities.map((city) => (
						<Grid item xs={12} sm={6} md={4} key={city.name}>
							<WeatherCard city={city} />
						</Grid>
					))}
				</Grid>
			)}
		</main>
	);
};

export default Home;
