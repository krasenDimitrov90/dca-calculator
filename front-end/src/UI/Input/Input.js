import React from 'react';

import './Input.styles.css';

export const Input = React.memo(({ value, label, name, inputDescription, onChange }) => {

    return (
        <div>
            <label htmlFor={name} className='font-bold text-app-text-secondary '>{label}</label>
            <div className='flex'>
                <input onChange={onChange} value={value} name={name}
                    className='app-input'
                    inputMode="numeric" pattern="[0-9]*"
                />
                <div className='py-app-s px-app-sm bg-app-purple-third font-bold text-app-text-secondary rounded-r-app-s flex justify-center'>
                    <p>{inputDescription}</p>
                </div>
            </div>
        </div>
    );
});
