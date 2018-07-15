import React from 'react';
import ReactDOM from 'react-dom';
import { fetchCryptocurrencies, fetchCrypyocurrencyById } from './FetchDataModule';

it('fetch Cryptocurrencies list api test', () => {
    expect.assertions(1);
    return fetchCryptocurrencies().then(responseObject => {
        expect(responseObject.data.length).toEqual(50);
    });
});

it('fetch Cryptocurrency with id 1 Bitcoin api test', () => {
    expect.assertions(2);
    return fetchCrypyocurrencyById(1).then(responseObject => {
        expect(responseObject.data.name).toMatch('Bitcoin');
        expect(responseObject.data.id).toEqual(1);
    });
});



