import { CssBaseline, ThemeProvider } from '@mui/material';
import 'assets/styles/global.scss';
import defaultTheme from 'assets/styles/theme/defaultTheme';
import Main from 'pages/Main';
import React from 'react';
import { render } from 'react-dom';

render(
	<ThemeProvider theme={defaultTheme}>
		<CssBaseline />

		<Main />
	</ThemeProvider>,
	document.getElementById('root')
);
