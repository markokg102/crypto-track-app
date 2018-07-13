import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CryptocurrenciesTableComponent from './features/cryptocurrencies-table/CryptocurrenciesTableComponent';
import CryptocurrencyDetailsComponent from './features/cryptocurrency-details/CryptocurrencyDetailsComponent';

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>CryptoTrack App</h1>
				<Router>
					<Switch>
						<Route path="/" exact component={CryptocurrenciesTableComponent} />
						<Route path="/details" exact component={CryptocurrencyDetailsComponent} />
						<Route component={() => <div>Page not found, sorry:(</div>} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
