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
					<tr key={'row' + cryptocurrency.id}>
						<td>{cryptocurrency.name}</td>
						<td>{cryptocurrency.symbol}</td>
						<td>{cryptocurrency.quotes.USD.price}</td>
						<td>{cryptocurrency.quotes.USD.percent_change_24h}</td>
						<td>
							<form onSubmit={(event) => props.handleSubmitAmmountYouOwn(event, cryptocurrency.id)}>
								<input
									style={{ width: '100%' }}
									id={cryptocurrency.id}
									onChange={props.handleInputChangeAmmountYouOwn}
									value={cryptocurrency.ammountYouOwn ? cryptocurrency.ammountYouOwn : ''}
								/>
								<br />
								<input style={{ width: '100%' }} type="submit" value="Submit" />
							</form>
						</td>
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
			.then(responseObject => {
				let dataWithAmmountYouOwnFromLocalStorage = responseObject.data.map(cryptocurrency => {
					let ammountYouOwn = localStorage.getItem(cryptocurrency.id);
					if(ammountYouOwn) {
						return {...cryptocurrency, ammountYouOwn};
					}
					return cryptocurrency;
				});

				let responseObjectWithAmmountYouOwnFromLocalStorage = {...responseObject, data: dataWithAmmountYouOwnFromLocalStorage}

				this.setState({ responseObject: responseObjectWithAmmountYouOwnFromLocalStorage, isLoading: false });
			});
	}

	handleInputChangeAmmountYouOwn = (event) => {
		const target = event.target;
		const value = target.value.trim();
		const id = target.id;
		let updatedDataRows = this.state.responseObject.data.map(cryptocurrency => {

			if (cryptocurrency.id === Number(id)) {
				return { ...cryptocurrency, ammountYouOwn: value };
			}

			return cryptocurrency;
		});

		let responseObjectUpdated = { ...this.state.responseObject, data: updatedDataRows };

		this.setState({ ...this.state, responseObject: responseObjectUpdated });

	}

	handleSubmitAmmountYouOwn = (event, cryptocurrencyId) => {
		event.preventDefault();
		let cryptocurrencyIdNumber = Number(cryptocurrencyId);
		let filteredByIdCryptocurrencies = this.state.responseObject.data.filter(cryptocurrency => cryptocurrency.id === cryptocurrencyIdNumber);
		if (filteredByIdCryptocurrencies.length === 1) {
			localStorage.setItem(cryptocurrencyId, filteredByIdCryptocurrencies[0].ammountYouOwn);
		}
	}

	render() {
		const isLoadingSuccessfullyData = !this.state.isLoading && this.state.responseObject;

		return (
			<div>
				{!isLoadingSuccessfullyData ?
					(<h2>Loading</h2 >) :
					(<ResultTable
						responseObject={this.state.responseObject}
						handleInputChangeAmmountYouOwn={this.handleInputChangeAmmountYouOwn}
						handleSubmitAmmountYouOwn={this.handleSubmitAmmountYouOwn} />)
				}
			</div>
		);
	}
}

export default CryptocurrenciesTableComponent;