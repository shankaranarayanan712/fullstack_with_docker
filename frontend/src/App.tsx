/** @format */

import './App.css';

import { BrowserRouter } from 'react-router-dom';
import PlayerContainer from './container/playerContainer';
import nbaIcon from './nba.png';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={nbaIcon} className='App-logo' alt='NBA Icon' />
				<h1 className='App-title'>My NBA App</h1>
			</header>
			<BrowserRouter>
				<PlayerContainer />
			</BrowserRouter>
		</div>
	);
}

export default App;





