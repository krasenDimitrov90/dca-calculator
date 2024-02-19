import React from 'react';

// name="purchaseAmount" Purchase amount:

export const Input = React.memo(({ label, name, type, inputDescription, required = false }) => {
    return (
        <div>
            <label htmlFor={name} className='font-bold text-app-text-secondary '>{label}</label>
            <div className='flex'>
                <input type={type} name={name} required={required}
                    className='flex-1 rounded-l-app-s outline-none bg-app-purple pl-app-base text-app-text-primary'
                />
                <div className='py-app-s px-app-sm bg-app-purple-third font-bold text-app-text-secondary rounded-r-app-s flex justify-center'>
                    <p>{inputDescription}</p>
                </div>
            </div>
        </div>
    );
});
