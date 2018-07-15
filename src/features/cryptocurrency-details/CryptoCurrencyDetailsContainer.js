import React from 'react';
import './CryptocurrencyDetailsStyle.scss';
import LoaderComponentView from '../common/LoaderComponentView';
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
			}, 200);
		});
	}

	render() {

		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		if (isLoadingSuccessfullyData) {
			return (<CryptocurrencyDetailsComponent responseObject={this.state.responseObject} />);
		} else {
			return (<LoaderComponentView />);
		}

	}
}

export default CryptocurrencyDetailsContainer;