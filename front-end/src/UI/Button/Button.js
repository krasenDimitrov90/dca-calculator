import React, { Children } from 'react';

import './Button.styles.css';

export const Button = React.memo(({ children, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            className='btn-main'
            disabled={disabled}
        >
            {children}
        </button>
    );
});
