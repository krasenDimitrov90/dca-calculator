import React from 'react';

export const CuurencyOption = React.memo(() => {
    const [selectedValue, setSelectedValue] = React.useState('USD');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className="flex items-center">
            <span className="mr-2 text-white">Currency</span>
            <div className="relative inline-block">
                <select
                    value={selectedValue}
                    onChange={handleChange}
                    className="appearance-none bg-[#282A51] w-[100px] cursor-pointer rounded p-app-xs pr-10 pl-2 text-white outline-none"
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="BGN">BGN</option>
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
        </div>
    );
    // return (
    //     <div className='flex gap-4'>
    //         <p>Currency</p>
    //         <div>
    //             <select defaultValue="USD" className='bg-[#282A51] w-[100px] cursor-pointer rounded'>
    //                 <option value="USD">USD</option>
    //                 <option value="EUR">EUR</option>
    //                 <option value="BGN">BGN</option>
    //             </select>
    //         </div>
    //     </div>
    // );
});
