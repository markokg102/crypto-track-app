import React from 'react';
import { Link } from 'react-router-dom';
import './CryptocurrencyDetailsStyle.scss';

const CryptocurrencyDetailsComponent = ({ responseObject }) => {

	const lastUpdated = new Date(responseObject.data.last_updated * 1000);

	return (
		<div>
			<Link to="/"><button>Back to list</button></Link>
			<div className="flex-container">
				<div className="first-column">
					<h2>{responseObject.data.name}</h2>
				</div>
				<div className="second-column">
					<label>Short name: {responseObject.data.symbol}</label>
					<label>Rank: {responseObject.data.rank}</label>
					<label>Website slug: {responseObject.data.website_slug}</label>
					<label>Circulating supply: {responseObject.data.circulating_supply}</label>
					<label>Total supply: {responseObject.data.total_supply}</label>
					<label>Max supply: {responseObject.data.max_supply}</label>
					<label>Last updated: {lastUpdated.toLocaleDateString() + ' ' + lastUpdated.toLocaleTimeString()}</label>
					<label>Id: {responseObject.data.id}</label>
				</div>
				<div className="third-column">
					<label>Price USD: {responseObject.data.quotes.USD.price}</label>
					<label>Volume in 24h:  {responseObject.data.quotes.USD.volume_24h}</label>
					<label>Market cap:  {responseObject.data.quotes.USD.market_cap}</label>
					<label>Percent change in 1h:  {responseObject.data.quotes.USD.percent_change_1h}</label>
					<label>Percent change in 24h:  {responseObject.data.quotes.USD.percent_change_24h}</label>
					<label>Percent change in 7d:  {responseObject.data.quotes.USD.percent_change_7d}</label>
				</div>
			</div>
		</div>
	);
};

export default CryptocurrencyDetailsComponent;