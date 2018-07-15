const ROW_LIMIT = 50;
const API_URL = 'https://api.coinmarketcap.com/v2/ticker/';

export const fetchCryptocurrencies = () => {
    return fetch(API_URL + '?limit=' + ROW_LIMIT + '&structure=array')
        .then(response => response.json())
        .then(responseObject => responseObject)
        .catch(error => console.warn(error));
};

export const fetchCrypyocurrencyById = (cryptocurrencyId) => {
    return fetch(API_URL + cryptocurrencyId + '/')
        .then(response => {
            return response.json();
        })
        .then(responseObject => responseObject)
        .catch(error => console.warn(error));
};