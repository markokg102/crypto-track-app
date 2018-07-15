import React from 'react';
import PropTypes from 'prop-types';

const LoaderComponent = ({ title }) => {
    return (
        <div>
            <img style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} src="/loader.gif" alt="loader not loaded" />
            <h2 style={{ textAlign: 'center' }}>{title}...</h2>
        </div>
    );
};

LoaderComponent.propTypes = {
    title: PropTypes.string.isRequired
};

export default LoaderComponent; 