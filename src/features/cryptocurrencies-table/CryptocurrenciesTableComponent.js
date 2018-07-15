import React from 'react';
import { Link } from 'react-router-dom';
import './CryptocurrenciesTableStyle.scss';

class CryptocurrenciesTableComponent extends React.Component {
	render() {
		let paginationLinks = [];
		let currentPageData = this.props.responseObject.data.filter(
			(cryptocurrency, index) => {
				return index >= (this.props.currentPage - 1) * this.props.rowsPerPage && index < this.props.currentPage * this.props.rowsPerPage;
			});
		for (let i = 1; i <= this.props.numberOfPages; i++) {
			paginationLinks.push(
				<span key={i} >
					<a href='' onClick={(event) => this.props.changePage(event, i)} className={i === this.props.currentPage ? 'activePage' : 'inactivePage'}>
						{i}
					</a> </span>);
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
						</tr>
					</thead>
					<tbody>
						{currentPageData.map(cryptocurrency => (
							<tr key={'row' + cryptocurrency.id}>
								<td><Link to={'/details/' + cryptocurrency.id + '/'}>{cryptocurrency.name}</Link></td>
								<td>{cryptocurrency.symbol}</td>
								<td>{cryptocurrency.quotes.USD.price}</td>
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
										<input disabled={!cryptocurrency.ammountYouOwnChanged} style={{ width: '100%' }} type="submit" value="Submit" />
									</form>
								</td>
								<td>{cryptocurrency.ammountYouOwn ? cryptocurrency.ammountYouOwn * cryptocurrency.quotes.USD.price : ''}</td>
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

export default CryptocurrenciesTableComponent;