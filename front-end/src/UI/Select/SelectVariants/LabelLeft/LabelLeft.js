import React from 'react';

const Option = React.memo(({ option }) => {
    return <option value={option}>{option}</option>;
});

export const LabelLeft = React.memo(({ label, options, onChange }) => {
    const [selectedValue, setSelectedValue] = React.useState('USD');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div className='items-center flex'>
            <span className="mr-2 text-white">{label}</span>
            <div className="relative inline-block">
                <select
                    value={selectedValue}
                    onChange={handleChange}
                    className="appearance-none bg-app-purple-secondary w-[100px] cursor-pointer rounded p-app-xs pr-10 pl-2 text-white outline-none"
                >
                    {options.map(option => {
                        return (
                            <Option
                                key={`option-lable-left-${option}`}
                                option={option}
                            />
                        );
                    })}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                        className="h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 17a1 1 0 0 1-.707-.293l-7-7a1 1 0 0 1 1.414-1.414L10 14.586l6.293-6.293a1 1 0 0 1 1.414 1.414l-7 7A1 1 0 0 1 10 17z"
                        />
                    </svg>
                </div>
            </div>
        </div >
    );
});
