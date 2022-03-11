import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';

const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		boxShadow: theme.shadows[1],
		fontSize: theme.typography.pxToRem(14)
	},

	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.common.black
	}
}));

export default DarkTooltip;
