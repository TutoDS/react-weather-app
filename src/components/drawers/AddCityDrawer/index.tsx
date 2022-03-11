import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CloseIcon from '@mui/icons-material/Close';
import {
	Drawer,
	FormControl,
	IconButton,
	InputLabel,
	NativeSelect,
	Stack,
	SxProps,
	Typography
} from '@mui/material';
import CustomSnackbar from 'components/CustomSnackbar';
import { ChangeEvent, useEffect, useState } from 'react';
import { CountryType } from 'shared/@types/CountriesResponse';
import { SavedCityType } from 'shared/@types/WeatherContext';
import useSnackbar from 'shared/hooks/useSnackbar';
import useWeather from 'shared/hooks/useWeather';
import { getCountries } from 'shared/services/country/countryServices';
import { SaveIconButton } from './styles';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	sx?: SxProps;
};

const AddCityDrawer = ({ isOpen, onClose, sx, ...props }: Props) => {
	const { addCity } = useWeather();

	const { openSnackbar, closeSnackbar, snackbar } = useSnackbar();

	// City Data State
	const [data, setData] = useState<Omit<SavedCityType, 'coordinates'>>({
		name: '',
		country: ''
	});

	// Countries State
	const [countriesData, setCountriesData] = useState<CountryType[]>([]);

	// Get countries
	const getCountriesList = async () => {
		try {
			const { data } = await getCountries();

			/**
			 * Remove countries with same ISO2 code
			 *
			 * unique: array of countries (using the .some to validate if any object on array
			 * haves that ISO2 code)
			 * currentCountry: current country object present on original array
			 * []: initial value of reducer
			 */
			const result = data.reduce((unique: CountryType[], currentCountry: CountryType) => {
				if (!unique.some((country: CountryType) => country.iso2 === currentCountry.iso2)) {
					unique.push(currentCountry);
				}
				return unique;
			}, []);

			setCountriesData(result);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCountriesList();

		return () => {
			setData({ name: '', country: '' });
			setCountriesData([]);
		};
	}, []);

	// Handle Select change
	const handleInputChange = (evt: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = evt.target;

		// Avoid problems with second select when change the country
		if (name === 'country' && data.name !== '') {
			setData({
				name: '',
				[name]: value
			});
			return;
		}

		setData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	// Handle submit the values
	const handleSubmit = () => {
		if (!data.country || !data.name) {
			openSnackbar('Please fill the city and the country field');
			return;
		}

		try {
			addCity(data);

			openSnackbar('City added successfully', 'success');

			onClose();

			setData({
				name: '',
				country: ''
			});
		} catch (error) {
			openSnackbar('Occurred an error while adding the city. Please try again.');
		}
	};

	return (
		<>
			<CustomSnackbar
				isOpen={snackbar.isOpen}
				onClose={closeSnackbar}
				message={snackbar.message}
				status={snackbar.status}
			/>

			<Drawer
				keepMounted
				anchor={'right'}
				open={isOpen}
				onClose={onClose}
				PaperProps={{
					sx: {
						width: ['75%', '50%', '25%'],
						backgroundColor: 'background.paper'
					}
				}}
				sx={{ position: 'relative', ...sx }}
				{...props}
			>
				<Stack
					direction={'row'}
					spacing={2}
					sx={{ px: 2, pt: 4, pb: 2 }}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Typography component={'h2'} variant={'h5'} fontWeight={'bold'}>
						Add City
					</Typography>

					<IconButton sx={{ color: 'primary.main' }} size={'medium'} onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>

				<Stack direction={'column'} spacing={4} sx={{ p: 2 }} alignItems={'start'}>
					{countriesData.length > 0 && (
						<>
							<FormControl fullWidth>
								<InputLabel htmlFor="country">Country</InputLabel>
								<NativeSelect
									defaultValue={data.country}
									inputProps={{
										name: 'country',
										id: 'country'
									}}
									onChange={handleInputChange}
								>
									{countriesData.map((country) => (
										<option key={country.iso2} value={country.iso2}>
											{country.country}
										</option>
									))}
								</NativeSelect>
							</FormControl>

							{data.country !== '' && (
								<FormControl fullWidth>
									<InputLabel htmlFor="city">City</InputLabel>
									<NativeSelect
										defaultValue={data.name}
										inputProps={{
											name: 'name',
											id: 'city'
										}}
										onChange={handleInputChange}
									>
										{countriesData
											.filter((country) => country.iso2 === data.country)[0]
											.cities.map((city) => (
												<option key={city} value={city}>
													{city}
												</option>
											))}
									</NativeSelect>
								</FormControl>
							)}
						</>
					)}
				</Stack>

				<SaveIconButton
					onClick={handleSubmit}
					aria-label={'Add City'}
					size={'large'}
					disabled={!data.country || !data.name}
				>
					<AddLocationAltIcon />
				</SaveIconButton>
			</Drawer>
		</>
	);
};

export default AddCityDrawer;
