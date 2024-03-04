import React from 'react';
import './Loader.styles.css';

export const Loader = React.memo(() => {
    return (
        <div className='loader-wrapper'>
            <div className="loader-bars"></div>
        </div>
    );
});
