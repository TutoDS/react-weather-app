import { Alert, AlertColor, Snackbar, SxProps } from '@mui/material';

type Props = {
	isOpen: boolean;
	message: string;
	status: AlertColor;
	onClose: () => void;
	sx?: SxProps;
};

const CustomSnackbar = ({ isOpen, message, status, onClose, sx, ...props }: Props) => {
	return (
		<Snackbar
			{...props}
			sx={{ ...sx }}
			open={isOpen}
			autoHideDuration={5000}
			onClose={onClose}
			message={message}
		>
			<Alert onClose={onClose} severity={status} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
