import React from 'react';
import CryptocurrenciesTableComponent from './CryptocurrenciesTableComponent';
import LoaderComponentView from '../common/LoaderComponentView';

class CryptocurrenciesTableContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			responseObject: null,
			isLoading: true
		};
	}

	loadData = () => {
		this.setState({ ...this.state, isLoading: true }, () => {
			setTimeout(() => {
				fetch('https://api.coinmarketcap.com/v2/ticker/?limit=50&structure=array')
					.then(response => response.json())
					.then(responseObject => {
						let dataWithAmmountYouOwnFromLocalStorage = responseObject.data.map(cryptocurrency => {
							let ammountYouOwn = localStorage.getItem(cryptocurrency.id);
							if (ammountYouOwn) {
								return { ...cryptocurrency, ammountYouOwn, ammountYouOwnChanged: false };
							}
							return { ...cryptocurrency, ammountYouOwnChanged: false };
						});

						let responseObjectWithAmmountYouOwnFromLocalStorage = { ...responseObject, data: dataWithAmmountYouOwnFromLocalStorage };

						this.setState({ responseObject: responseObjectWithAmmountYouOwnFromLocalStorage, isLoading: false });
					});
			}, 1000);
		});
	}

	componentDidMount() {
		this.interval = setInterval(() => this.loadData(), 60000);
		this.loadData();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	handleInputChangeAmmountYouOwn = (event) => {
		const target = event.target;
		const value = target.value.trim();
		const id = target.id;
		let updatedDataRows = this.state.responseObject.data.map(cryptocurrency => {

			if (cryptocurrency.id === Number(id)) {
				return { ...cryptocurrency, ammountYouOwn: value, ammountYouOwnChanged: true };
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

	refreshEvery60Seconds() {
		// this.setState(prevState => ({
		// 	seconds: prevState.seconds + 1
		// }));
	}

	render() {
		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		if (isLoadingSuccessfullyData) {
			return (
				<CryptocurrenciesTableComponent
					responseObject={this.state.responseObject}
					handleInputChangeAmmountYouOwn={this.handleInputChangeAmmountYouOwn}
					handleSubmitAmmountYouOwn={this.handleSubmitAmmountYouOwn} />);
		} else {
			return (<LoaderComponentView />);
		}
	}
}

export default CryptocurrenciesTableContainer;