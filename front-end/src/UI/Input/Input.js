import React from 'react';

import './Input.styles.css';

export const Input = React.memo(({ initialValue, label, name, min, inputDescription }) => {

    const [value, setValue] = React.useState(initialValue);

    const onChange = (e) => {
        let inputValue = e.target.value;
        // Remove non-digit characters using a regular expression
        inputValue = inputValue.replace(/\D/g, '');

        if (inputValue.length > 10) return;
        if (inputValue <= 1) inputValue = 1;
        setValue(inputValue);
    };

    return (
        <div>
            <label htmlFor={name} className='font-bold text-app-text-secondary '>{label}</label>
            <div className='flex'>
                <input onChange={onChange} value={value} name={name} min={min}
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
