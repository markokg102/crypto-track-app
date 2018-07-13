import React from 'react';


const ResultTable = (props) => {
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
				{props.responseObject.data.map(cryptocurrency => (
					<tr key={cryptocurrency.id}>
						<td>{cryptocurrency.name}</td>
						<td>{cryptocurrency.symbol}</td>
						<td>{cryptocurrency.quotes.USD.price}</td>
						<td>{cryptocurrency.quotes.USD.percent_change_24h}</td>
						<td>0.5</td>
						<td>{0.5 * cryptocurrency.quotes.USD.price}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};


class CryptocurrenciesTableComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			responseObject: null,
			isLoading: true
		};
	}

	componentDidMount() {
		fetch('https://api.coinmarketcap.com/v2/ticker/?limit=50&structure=array')
			.then(response => response.json())
			.then(responseObject => this.setState({ responseObject, isLoading: false }));
	}

	render() {
		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		return (
			<div>
				{!isLoadingSuccessfullyData ?
					(<h2>Loading</h2 >) : (<ResultTable responseObject={this.state.responseObject} />)
				}
			</div>
		);
	}
}

export default CryptocurrenciesTableComponent;