import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CryptocurrencyDetailsStyle.scss';

/**
 * This is simple basic view component of details page. 
 * This component show pure details of cryptocurrency in two columns
 * 
 */
const CryptocurrencyDetailsComponent = ({ data }) => {

	const lastUpdated = new Date(data.last_updated * 1000);

	return (
		<div>
			<Link to="/"><button className='submitButton'>Back to list</button></Link>
			<h2>{data.name}</h2>
			<div className="flex-container">
				<div className="first-column">
					<label>Short name: {data.symbol}</label>
					<label>Rank: {data.rank}</label>
					<label>Website slug: {data.website_slug}</label>
					<label>Circulating supply: {data.circulating_supply ? data.circulating_supply.toLocaleString() : ''}</label>
					<label>Total supply: {data.total_supply ? data.total_supply.toLocaleString() : ''}</label>
					<label>Max supply: {data.max_supply ? data.max_supply.toLocaleString() : ''}</label>
					<label>Last updated: {lastUpdated.toLocaleDateString() + ' ' + lastUpdated.toLocaleTimeString()}</label>
					<label>Id: {data.id}</label>
				</div>
				<div className="second-column">
					<label>Price USD: {data.quotes.USD.price.toLocaleString()}</label>
					<label>Volume in 24h:  {data.quotes.USD.volume_24h.toLocaleString()}</label>
					<label>Market cap:  {data.quotes.USD.market_cap.toLocaleString()}</label>
					<label>Percent change in 1h: % {data.quotes.USD.percent_change_1h}</label>
					<label>Percent change in 24h: % {data.quotes.USD.percent_change_24h}</label>
					<label>Percent change in 7d: % {data.quotes.USD.percent_change_7d}</label>
				</div>
			</div>
		</div>
	);
};

CryptocurrencyDetailsComponent.propTypes = {
		data: PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			symbol: PropTypes.string.isRequired,
			website_slug: PropTypes.string.isRequired,
			rank: PropTypes.number.isRequired,
			circulating_supply: PropTypes.number,
			total_supply: PropTypes.number,
			max_supply: PropTypes.number,
			quotes: PropTypes.shape({
				USD: PropTypes.shape({
					price: PropTypes.number.isRequired,
					volume_24h: PropTypes.number,
					market_cap: PropTypes.number,
					percent_change_1h: PropTypes.number,
					percent_change_24h: PropTypes.number,
					percent_change_7d: PropTypes.number
				}).isRequired
			}).isRequired,
			last_updated: PropTypes.number
		}).isRequired
};

export default CryptocurrencyDetailsComponent;