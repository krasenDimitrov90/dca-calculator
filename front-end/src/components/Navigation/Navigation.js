import React from 'react';
import './Navigation.styles.css';

export const Navigation = React.memo(() => {
    return (
        <div className='flex justify-between text-app-text-primary'>
            <div>
                <h3>Dollar Cost Average</h3>
            </div>
            <div className='flex gap-4'>
                <p>Currency</p>
                <div>
                    <p>USD</p>
                </div>
            </div>
        </div>
    );
});
