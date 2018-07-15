import React from 'react';
import CryptocurrenciesTableComponent from './CryptocurrenciesTableComponent';
import LoaderComponent from '../common/LoaderComponent';
import { fetchCryptocurrencies } from '../common/FetchDataModule';

const ROWS_PER_PAGE = 10;
const REFRESH_AFTER_60_SECONDS_PARAM = 60000;

/**
 * This is the main component tha is rendered on home screen.
 * Before data is reeived loader is active
 * This component fetching lis of data from API and redners CryptocurrenciesTableComponent
 * Also in this component are implemented refresh every 60 secunds and reading/saving to local storage.
 * 
 */
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

	/**
	 * On first load of page local storage your ammount in dolars are updated.
	 * Because we need to recalculate ammount in dolars on first load for tracking in future gained and losed amounts after last load. 
	 * After that local storage are only updated for concrete row when that row is submited.
	 */
	updateLocaleStorageYourAmmountInDolarsOnFirstLoad = (cryptocurrency) => {
		let ammountYouOwnObjectSavedInLocalStorage = JSON.parse(localStorage.getItem(cryptocurrency.id));
		if (ammountYouOwnObjectSavedInLocalStorage) {
			ammountYouOwnObjectSavedInLocalStorage.ammountYouOwnInDolars = cryptocurrency.quotes.USD.price * ammountYouOwnObjectSavedInLocalStorage.ammountYouOwn;
			localStorage.setItem(cryptocurrency.id, JSON.stringify(ammountYouOwnObjectSavedInLocalStorage));
		}
	}

	/**
	 * fetchDataAndUpdateState is most complex method.
	 * This method first fetchs data from API (this method is called on inital load and on every refrhesh).
	 * After receving data test if this is first load if that is true this methods call updateLocaleStorageYourAmmountInDolarsOnFirstLoad.
	 * If this not first load this method don't update storage ammount in dolars.
	 * After that this method reads for every row amountYouOwn and ammountYouOwnInDolars from storage and then merges row from api with
	 * data from storage.
	 * At the end updates state of component and that causes refreshing of data on UI.
	 * 
	 */
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

			this.setState({
				...this.state, responseObject: responseObjectWithAmmountYouOwnFromLocalStorage,
				isLoading: false,
				numberOfPages: Math.trunc(responseObjectWithAmmountYouOwnFromLocalStorage.data.length / ROWS_PER_PAGE),
				firstLoadPassed: true
			});
		});
	}

	/**
	 * This method simple sets that state is loading and after 200ms load data from api.
	 * 
	 */
	loadData = () => {
		this.setState({ ...this.state, isLoading: true }, () => {
			setTimeout(() => {
				this.fetchDataAndUpdateState();
			}, 300);
		});
	}

	/**
	 * 
	 * In component did mount is initialized timer for refreshing and also here is executed initial load of data.
	 * 
	 */
	componentDidMount() {
		this.interval = setInterval(() => this.loadData(), REFRESH_AFTER_60_SECONDS_PARAM);
		this.loadData();
	}

	/**
	 * 
	 * 
	 * Simply clear timer to avoid leak.
	 * 
	 * 
	 */
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	/**
	 * 
	 * handleInputChangeAmmountYouOwn is handler for updating amountYouOwn, this handler iz bind on every input field on table.
	 * 
	 */
	handleInputChangeAmmountYouOwn = (event) => {
		const target = event.target;
		const value = target.value.trim();
		const id = target.id;

		if (isNaN(value)) {
			alert('You not entered number!');
			return;
		}

		let updatedDataRows = this.state.responseObject.data.map(cryptocurrency => {

			if (cryptocurrency.id === Number(id)) {
				return { ...cryptocurrency, ammountYouOwn: value, ammountYouOwnChanged: true };
			}

			return cryptocurrency;

		});

		let responseObjectUpdated = { ...this.state.responseObject, data: updatedDataRows };

		this.setState({ ...this.state, responseObject: responseObjectUpdated });
	}

	/**
	 * 
	 * handleSubmitAmmountYouOwn saves ammountYouOwn and ammountYouOwnInDolars into storage. 
	 * And also update ammountYouOwnInDolars in data.
	 * When ammountOfYou own is submited gainedLostSinceLastVisit becomes 0.
	 * 
	 */
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