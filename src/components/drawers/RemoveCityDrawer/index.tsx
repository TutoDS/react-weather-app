import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Drawer, IconButton, Stack, SxProps, Typography } from '@mui/material';
import CustomSnackbar from 'components/CustomSnackbar';
import DarkTooltip from 'components/tooltips/DarkTooltip';
import { SavedCityType } from 'shared/@types/WeatherContext';
import useSnackbar from 'shared/hooks/useSnackbar';
import useWeather from 'shared/hooks/useWeather';

import { RemoveIconButton } from './styles';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	city: SavedCityType;
	sx?: SxProps;
};

const RemoveCityDrawer = ({ isOpen, onClose, city, sx, ...props }: Props) => {
	const { removeCity } = useWeather();

	const { openSnackbar, closeSnackbar, snackbar } = useSnackbar();

	// Handle submit
	const handleSubmit = () => {
		if (!city) {
			openSnackbar("You don't have a valid city to remove!");
			return;
		}

		try {
			removeCity(city);

			onClose();
		} catch (error) {
			openSnackbar('Occurred an error while removing the city. Please try again.');
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
						Remove {city.name}
					</Typography>

					<IconButton sx={{ color: 'primary.main' }} size={'medium'} onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>

				<Stack
					direction={'column'}
					spacing={2}
					sx={{ p: 2 }}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Typography
						variant={'h6'}
						component={'h6'}
						fontWeight={300}
						textAlign={'center'}
					>
						You have sure you want to remove <strong>{city.name}</strong>?
					</Typography>
				</Stack>

				<Stack alignItems={'center'} justifyContent={'center'}>
					<DarkTooltip title={'Remove City'} placement={'top'} arrow>
						<RemoveIconButton
							onClick={handleSubmit}
							aria-label={'Remove City'}
							size={'large'}
						>
							<DeleteIcon />
						</RemoveIconButton>
					</DarkTooltip>
				</Stack>
			</Drawer>
		</>
	);
};

export default RemoveCityDrawer;
