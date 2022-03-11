import { AlertColor } from '@mui/material';
import { useEffect, useState } from 'react';

type SnackbarState = {
	isOpen: boolean;
	message: string;
	status: AlertColor;
};

const useSnackbar = () => {
	const [snackbar, setSnackbar] = useState<SnackbarState>({
		isOpen: false,
		message: '',
		status: 'error'
	});

	useEffect(() => {
		if (snackbar.isOpen === true) {
			setTimeout(() => {
				setSnackbar((prevState) => ({
					...prevState,
					isOpen: false
				}));
			}, 5000);
		}
	}, [snackbar.isOpen]);

	const openSnackbar = (msg: string, status?: AlertColor) => {
		setSnackbar({
			isOpen: true,
			message: msg,
			status: status || 'error'
		});
	};

	const closeSnackbar = () =>
		setSnackbar((prevState) => ({
			...prevState,
			isOpen: false,
			message: ''
		}));

	return { snackbar, openSnackbar, closeSnackbar };
};

export default useSnackbar;
