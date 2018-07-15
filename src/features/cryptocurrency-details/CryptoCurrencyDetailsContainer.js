import React from 'react';
import './CryptocurrencyDetailsStyle.scss';
import LoaderComponent from '../common/LoaderComponent';
import { fetchCrypyocurrencyById } from '../common/FetchDataModule';
import CryptocurrencyDetailsComponent from './CryptocurrencyDetailsComponent';

class CryptocurrencyDetailsContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			responseObject: null,
			isLoading: true
		};
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		let cryptocurrencyId = this.props.match.params.id;
		this.setState({ ...this.state, isLoading: true }, () => {
			setTimeout(() => {
				fetchCrypyocurrencyById(cryptocurrencyId).then(responseObject => {
					this.setState({ responseObject: responseObject, isLoading: false });
				});
			}, 300);
		});
	}

	render() {
		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		if (isLoadingSuccessfullyData) {
			return (<CryptocurrencyDetailsComponent data={this.state.responseObject.data} />);
		} else {
			return (<LoaderComponent title='Loading cryptocurrency details' />);
		}
	}

}

export default CryptocurrencyDetailsContainer;