import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CryptocurrenciesTableComponent from './features/cryptocurrencies-table/CryptocurrenciesTableComponent';
import CryptocurrencyDetailsComponent from './features/cryptocurrency-details/CryptocurrencyDetailsComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={CryptocurrenciesTableComponent} />
          <Route path="/details" exact component={CryptocurrencyDetailsComponent} />
          <Route component={() => <div>Page not found, sorry:(</div>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
