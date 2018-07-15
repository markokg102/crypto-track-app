import React from 'react';
import CryptocurrenciesTableComponent from './CryptocurrenciesTableComponent';
import LoaderComponent from '../common/LoaderComponent';
import { fetchCryptocurrencies } from '../common/FetchDataModule';

const ROWS_PER_PAGE = 10;

class CryptocurrenciesTableContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			responseObject: null,
			isLoading: true,
			currentPage: 1,
			numberOfPages: null,
			firstLoadPassed: false
		};
	}

	updateLocaleStorageYourAmmountInDolarsOnFirstLoad = (cryptocurrency) => {
		let ammountYouOwnObjectSavedInLocalStorage = JSON.parse(localStorage.getItem(cryptocurrency.id));
		if (ammountYouOwnObjectSavedInLocalStorage) {
			ammountYouOwnObjectSavedInLocalStorage.ammountYouOwnInDolars = cryptocurrency.quotes.USD.price * ammountYouOwnObjectSavedInLocalStorage.ammountYouOwn;
			localStorage.setItem(cryptocurrency.id, JSON.stringify(ammountYouOwnObjectSavedInLocalStorage));
		}
	}

	fetchDataAndUpdateState = () => {
		fetchCryptocurrencies().then(responseObject => {
			let dataWithAmmountYouOwnFromLocalStorage = responseObject.data.map(cryptocurrency => {

				if (!this.state.firstLoadPassed) {
					this.updateLocaleStorageYourAmmountInDolarsOnFirstLoad(cryptocurrency);
				}

				let ammountYouOwnObjectSavedInLocalStorage = JSON.parse(localStorage.getItem(cryptocurrency.id));

				if (ammountYouOwnObjectSavedInLocalStorage) {

					let cryptocurrencyWithAmmountYouOwn = { ...cryptocurrency };

					cryptocurrencyWithAmmountYouOwn.ammountYouOwn = ammountYouOwnObjectSavedInLocalStorage.ammountYouOwn;
					cryptocurrencyWithAmmountYouOwn.ammountYouOwnChanged = false;
					cryptocurrencyWithAmmountYouOwn.ammountYouOwnInDolars = ammountYouOwnObjectSavedInLocalStorage.ammountYouOwnInDolars;
					cryptocurrencyWithAmmountYouOwn.gainedLostSinceLastVisit = cryptocurrencyWithAmmountYouOwn.ammountYouOwn * cryptocurrencyWithAmmountYouOwn.quotes.USD.price - cryptocurrencyWithAmmountYouOwn.ammountYouOwnInDolars;

					return cryptocurrencyWithAmmountYouOwn;

				}

				return { ...cryptocurrency, ammountYouOwnChanged: false };

			});

			let responseObjectWithAmmountYouOwnFromLocalStorage = { ...responseObject, data: dataWithAmmountYouOwnFromLocalStorage };

			this.setState({ ...this.state, responseObject: responseObjectWithAmmountYouOwnFromLocalStorage, isLoading: false, numberOfPages: Math.trunc(responseObjectWithAmmountYouOwnFromLocalStorage.data.length / ROWS_PER_PAGE), firstLoadPassed: true });
		});
	}

	loadData = () => {
		this.setState({ ...this.state, isLoading: true }, () => {
			setTimeout(() => {
				this.fetchDataAndUpdateState();
			}, 300);
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

		let updatedDataRows = this.state.responseObject.data.map(cryptocurrency => {

			if (cryptocurrency.id === cryptocurrencyIdNumber) {
				let cryptocurrencyUpdated = { ...cryptocurrency, ammountYouOwnInDolars: cryptocurrency.ammountYouOwn * cryptocurrency.quotes.USD.price, gainedLostSinceLastVisit: 0, ammountYouOwnChanged: false };
				localStorage.setItem(cryptocurrencyId, JSON.stringify({ ammountYouOwn: cryptocurrencyUpdated.ammountYouOwn, ammountYouOwnInDolars: cryptocurrencyUpdated.ammountYouOwn * cryptocurrencyUpdated.quotes.USD.price }));
				return cryptocurrencyUpdated;
			}
			return cryptocurrency;
		});

		let responseObjectUpdated = { ...this.state.responseObject, data: updatedDataRows };

		this.setState({ ...this.state, responseObject: responseObjectUpdated });
	}

	changePage = (event, pageNumber) => {
		event.preventDefault();
		this.setState({ ...this.state, currentPage: pageNumber });
	}

	render() {
		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		if (isLoadingSuccessfullyData) {
			return (
				<CryptocurrenciesTableComponent
					data={this.state.responseObject.data}
					handleInputChangeAmmountYouOwn={this.handleInputChangeAmmountYouOwn}
					handleSubmitAmmountYouOwn={this.handleSubmitAmmountYouOwn}
					rowsPerPage={ROWS_PER_PAGE}
					numberOfPages={this.state.numberOfPages}
					currentPage={this.state.currentPage}
					changePage={this.changePage} />);
		} else {
			return (<LoaderComponent title={!this.state.firstLoadPassed ? 'Loading cryptocurrencies' : 'Refreshing cryptocurrencies...'} />);
		}
	}
}

export default CryptocurrenciesTableContainer;