import { CircularProgress, Stack } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const Overlay = styled(Stack)(({ theme }) => ({
	zIndex: 99999,

	position: 'absolute',
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,

	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',

	backgroundColor: alpha(theme.palette.common.black, 0.75)
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
	color: theme.palette.grey[300]
}));

export { Overlay, StyledCircularProgress };
