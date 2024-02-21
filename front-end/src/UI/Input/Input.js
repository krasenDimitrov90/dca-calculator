import React from 'react';

import './Input.styles.css';

export const Input = React.memo(({ label, name, type, inputDescription, required = false }) => {
    return (
        <div>
            <label htmlFor={name} className='font-bold text-app-text-secondary '>{label}</label>
            <div className='flex'>
                <input type={type} name={name} min={1} required={required}
                    className='app-input'
                />
                <div className='py-app-s px-app-sm bg-app-purple-third font-bold text-app-text-secondary rounded-r-app-s flex justify-center'>
                    <p>{inputDescription}</p>
                </div>
            </div>
        </div>
    );
});
