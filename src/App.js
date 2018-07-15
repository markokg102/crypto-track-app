import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CryptocurrenciesTableContainer from './features/cryptocurrencies-table/CryptocurrenciesTableContainer';
import CryptocurrencyDetailsContainer from './features/cryptocurrency-details/CryptoCurrencyDetailsContainer';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>CryptoTrack App</h1>
				<Router>
					<Switch>
						<Route path="/" exact component={CryptocurrenciesTableContainer} />
						<Route path="/details/:id" exact component={CryptocurrencyDetailsContainer} />
						<Route component={() => <div>Page not found, sorry:(</div>} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
