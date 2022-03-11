import { IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const SaveIconButton = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	bottom: 20,
	right: 20,

	color: theme.palette.common.white,
	backgroundColor: theme.palette.primary.main,

	'&:hover': {
		backgroundColor: theme.palette.primary.dark
	},

	'&:disabled': {
		backgroundColor: theme.palette.grey[300],
		color: alpha(theme.palette.primary.light, 0.65)
	}
}));

export { SaveIconButton };
