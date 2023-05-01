import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { createTheme, ThemeProvider } from '@material-ui/core/styles';
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

// const theme = createTheme({
// 	palette: {
// 		type: 'dark',
// 		primary: {
// 			main: '#000000',
// 		},
// 		secondary: {
// 			main: '#ffffff',
// 		},
// 		error: {
// 			main: '#ff0000',
// 		},
// 	},
// });
root.render(
	<React.StrictMode>
		{/* <ThemeProvider theme={theme}>   if needed a theme can be set up here*/}
		<App />
		{/* </ThemeProvider> */}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
