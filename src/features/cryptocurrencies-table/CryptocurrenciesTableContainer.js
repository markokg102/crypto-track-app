import React from 'react';
import CryptocurrenciesTableViewComponent from './CryptocurrenciesTableViewComponent';

class CryptocurrenciesTableComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			responseObject: null,
			isLoading: true
		};
	}

	componentDidMount() {
		fetch('https://api.coinmarketcap.com/v2/ticker/?limit=50&structure=array')
			.then(response => response.json())
			.then(responseObject => {
				let dataWithAmmountYouOwnFromLocalStorage = responseObject.data.map(cryptocurrency => {
					let ammountYouOwn = localStorage.getItem(cryptocurrency.id);
					if (ammountYouOwn) {
						return { ...cryptocurrency, ammountYouOwn };
					}
					return cryptocurrency;
				});

				let responseObjectWithAmmountYouOwnFromLocalStorage = { ...responseObject, data: dataWithAmmountYouOwnFromLocalStorage };

				this.setState({ responseObject: responseObjectWithAmmountYouOwnFromLocalStorage, isLoading: false });
			});
	}

	handleInputChangeAmmountYouOwn = (event) => {
		const target = event.target;
		const value = target.value.trim();
		const id = target.id;
		let updatedDataRows = this.state.responseObject.data.map(cryptocurrency => {

			if (cryptocurrency.id === Number(id)) {
				return { ...cryptocurrency, ammountYouOwn: value };
			}

			return cryptocurrency;
		});

		let responseObjectUpdated = { ...this.state.responseObject, data: updatedDataRows };

		this.setState({ ...this.state, responseObject: responseObjectUpdated });

	}

	handleSubmitAmmountYouOwn = (event, cryptocurrencyId) => {
		event.preventDefault();
		let cryptocurrencyIdNumber = Number(cryptocurrencyId);
		let filteredByIdCryptocurrencies = this.state.responseObject.data.filter(cryptocurrency => cryptocurrency.id === cryptocurrencyIdNumber);
		if (filteredByIdCryptocurrencies.length === 1) {
			localStorage.setItem(cryptocurrencyId, filteredByIdCryptocurrencies[0].ammountYouOwn);
		}
	}

	render() {
		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		if (isLoadingSuccessfullyData) {
			return (
				<CryptocurrenciesTableViewComponent
					responseObject={this.state.responseObject}
					handleInputChangeAmmountYouOwn={this.handleInputChangeAmmountYouOwn}
					handleSubmitAmmountYouOwn={this.handleSubmitAmmountYouOwn} />);
		} else {
			return (<h2>Loading</h2>);
		}
	}
}

export default CryptocurrenciesTableComponent;