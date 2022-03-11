import { IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const RemoveIconButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.common.white,
	backgroundColor: theme.palette.secondary.main,

	'&:hover': {
		backgroundColor: theme.palette.secondary.dark
	},

	'&:disabled': {
		backgroundColor: theme.palette.grey[300],
		color: alpha(theme.palette.secondary.light, 0.65)
	}
}));

export { RemoveIconButton };
