import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
	palette: {
		// mode: 'dark',

		primary: {
			main: '#1E4174'
		},

		secondary: {
			main: '#DFA94A'
		},

		background: {
			// default: '#142326'
			// paper: '#3B3C40'
		}
	},

	typography: {
		fontFamily: "'Poppins', sans-serif"
	},

	components: {
		MuiToolbar: {
			styleOverrides: {
				// Name of the slot
				root: {
					paddingLeft: '0 !important',
					paddingRight: '0 !important'
				}
			}
		}
	}
});

export default defaultTheme;
