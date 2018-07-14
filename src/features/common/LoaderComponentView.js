import React from 'react';

const LoaderComponentView = () => {
    return (
        <div>
            <img style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} src="loader.gif" alt="loader not loaded" />
            <h2 style={{ textAlign: 'center' }}>Loading Cryptocurrencies...</h2>
        </div>
    );
};

export default LoaderComponentView; 