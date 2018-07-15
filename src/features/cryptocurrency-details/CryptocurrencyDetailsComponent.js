import React from 'react';
import { Link } from 'react-router-dom';
import './CryptocurrencyDetailsStyle.scss';
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
			}, 200);
		});
	}

	render() {

		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;
		

		if (isLoadingSuccessfullyData) {

			const lastUpdated = new Date(this.state.responseObject.data.last_updated * 1000);
			
			return (
				<div>
					<Link to="/"><button>Back to list</button></Link>
					<div className="flex-container">
						<div class="first-column">
							<h2>{this.state.responseObject.data.name}</h2>
						</div>
						<div class="second-column">
							<label>Short name: {this.state.responseObject.data.symbol}</label>
							<label>Rank: {this.state.responseObject.data.rank}</label>
							<label>Website slug: {this.state.responseObject.data.website_slug}</label>
							<label>Circulating supply: {this.state.responseObject.data.circulating_supply}</label>
							<label>Total supply: {this.state.responseObject.data.total_supply}</label>
							<label>Max supply: {this.state.responseObject.data.max_supply}</label>
							<label>Last updated: {lastUpdated.toLocaleDateString() + ' ' + lastUpdated.toLocaleTimeString()}</label>
							<label>Id: {this.state.responseObject.data.id}</label>
						</div>
						<div class="third-column">
							<label>Price USD: {this.state.responseObject.data.quotes.USD.price}</label>
							<label>Volume in 24h:  {this.state.responseObject.data.quotes.USD.volume_24h}</label>
							<label>Market cap:  {this.state.responseObject.data.quotes.USD.market_cap}</label>
							<label>Percent change in 1h:  {this.state.responseObject.data.quotes.USD.percent_change_1h}</label>
							<label>Percent change in 24h:  {this.state.responseObject.data.quotes.USD.percent_change_24h}</label>
							<label>Percent change in 7d:  {this.state.responseObject.data.quotes.USD.percent_change_7d}</label>
						</div>
					</div>
				</div>
			);
		} else {
			return (<LoaderComponentView />);
		}

	}
}

export default CryptocurrencyDetailsComponent;