import React from 'react';
import './LoaderBars.styles.css';

export const LoaderBars = React.memo(() => {
    return (
        <div className='loader-wrapper'>
            <div className="loader-bars"></div>
        </div>
    );
});
