import React from 'react';
import { Link } from 'react-router-dom';
import './CryptocurrenciesTableStyle.scss';

class CryptocurrenciesTableComponent extends React.Component {
	render() {
		return (
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
					{this.props.responseObject.data.map(cryptocurrency => (
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
		);
	}

}

export default CryptocurrenciesTableComponent;