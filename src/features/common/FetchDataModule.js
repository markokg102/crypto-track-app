const ROW_LIMIT = 50;

export const fetchCryptocurrencies = () => {
    return fetch('https://api.coinmarketcap.com/v2/ticker/?limit=' + ROW_LIMIT + '&structure=array')
        .then(response => response.json())
        .then(responseObject => responseObject)
        .catch(error => console.warn(error));
};

export const fetchCrypyocurrencyById = (cryptocurrencyId) => {
    return fetch('https://api.coinmarketcap.com/v2/ticker/' + cryptocurrencyId + '/')
        .then(response => {
            return response.json();
        })
        .then(responseObject => responseObject);
};