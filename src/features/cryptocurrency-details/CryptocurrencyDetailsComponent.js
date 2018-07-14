import React from 'react';
import LoaderComponentView from '../common/LoaderComponentView';

class CryptocurrencyDetailsComponent extends React.Component {

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
				fetch('https://api.coinmarketcap.com/v2/ticker/' + cryptocurrencyId + '/')
					.then(response => {
						console.log(response);
						return response.json();
					})
					.then(responseObject => {
						this.setState({ responseObject: responseObject, isLoading: false });
					});
			}, 500);
		});
	}

	render() {

		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		if (isLoadingSuccessfullyData) {
			return (
				<div>{this.state.responseObject.data.name}</div>);
		} else {
			return (<LoaderComponentView />);
		}

	}
}

export default CryptocurrencyDetailsComponent;