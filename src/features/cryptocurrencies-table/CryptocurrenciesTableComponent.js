import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CryptocurrenciesTableStyle.scss';

/**
 * CryptocurrenciesTableComponent is pure UI component for rendering list of cryptocurrencies with pagination.
 * All data and handlers are received from parrent container component.
 * 
 */
class CryptocurrenciesTableComponent extends React.Component {
	render() {
		let paginationLinks = [];

		let currentPageData = this.props.data.filter((cryptocurrency, index) => {
			return index >= (this.props.currentPage - 1) * this.props.rowsPerPage && index < this.props.currentPage * this.props.rowsPerPage;
		});

		for (let i = 1; i <= this.props.numberOfPages; i++) {
			paginationLinks.push(
				<span key={i} >
					<a href=''
						onClick={(event) => this.props.changePage(event, i)}
						className={i === this.props.currentPage ? 'activePage' : 'inactivePage'}>
						{i}
					</a>
					<span> </span>
				</span>
			);
		}

		return (
			<div>
				<table style={{ width: '100%' }}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Short name</th>
							<th>$ value</th>
							<th>last 24h</th>
							<th>Ammount you own</th>
							<th>$ value of your coin</th>
							<th>$ gained / lost since last visit(site reload)</th>
						</tr>
					</thead>
					<tbody>
						{currentPageData.map(cryptocurrency => (
							<tr key={'row' + cryptocurrency.id}>
								<td><Link to={'/details/' + cryptocurrency.id + '/'}>{cryptocurrency.name}</Link></td>
								<td>{cryptocurrency.symbol}</td>
								<td>{'$ ' + cryptocurrency.quotes.USD.price.toFixed(2)}</td>
								<td className={cryptocurrency.quotes.USD.percent_change_24h > 0 ? 'positive-last24h' : 'negative-last24h'}>
									{Math.abs(cryptocurrency.quotes.USD.percent_change_24h) + ' %'}
								</td>
								<td>
									<form onSubmit={(event) => this.props.handleSubmitAmmountYouOwn(event, cryptocurrency.id)}>
										<input
											type="number"
											pattern="[0-9]+([\.,][0-9]+)?" step="0.01"
											style={{ width: '100%' }}
											id={cryptocurrency.id}
											onChange={this.props.handleInputChangeAmmountYouOwn}
											value={cryptocurrency.ammountYouOwn ? cryptocurrency.ammountYouOwn : ''}
										/>
										<br />
										<input className='submitButton' disabled={!cryptocurrency.ammountYouOwnChanged} style={{ width: '100%' }} type="submit" value="Submit" />
									</form>
								</td>
								<td>{ cryptocurrency.ammountYouOwnInDolars ? '$ ' + cryptocurrency.ammountYouOwnInDolars.toFixed(2) : ''}</td>
								<td>{!isNaN(cryptocurrency.gainedLostSinceLastVisit) ? '$ ' + cryptocurrency.gainedLostSinceLastVisit.toFixed(2) : ''}</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
					{paginationLinks}
				</div>
			</div>
		);
	}

}

CryptocurrenciesTableComponent.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		symbol: PropTypes.string.isRequired,
		website_slug: PropTypes.string.isRequired,
		rank: PropTypes.number,
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
	}).isRequired).isRequired,
	metadata: PropTypes.shape({
		timestamp: PropTypes.number,
		num_cryptocurrencies: PropTypes.number,
		error: PropTypes.any
	}),
	handleInputChangeAmmountYouOwn: PropTypes.func.isRequired,
	handleSubmitAmmountYouOwn: PropTypes.func.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	numberOfPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	changePage: PropTypes.func.isRequired
};

export default CryptocurrenciesTableComponent;