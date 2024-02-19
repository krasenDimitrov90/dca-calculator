import React, { Children } from 'react';

import './Button.styles.css';

export const Button = React.memo(({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className='btn-main'
        >
            {children}
        </button>
    );
});
