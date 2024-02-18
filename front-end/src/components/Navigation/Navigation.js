import React from 'react';
import './Navigation.styles.css';
import { Select } from '../../UI/Select/Select';

export const Navigation = React.memo(() => {
    return (
        <div className='flex justify-between text-app-text-primary py-app-base'>
            <div className='flex items-end py-app-xs'>
                <div className='flex items-end h-full gap-[6px] py-[3px] mr-app-base'>
                    <span className='flex bg-[#737CD9] h-[25%] w-[3px] rounded'></span>
                    <span className='flex bg-[#737CD9] h-[60%] w-[3px] rounded'></span>
                    <span className='flex bg-[#737CD9] h-[96%] w-[3px] rounded'></span>
                </div>
                <h3 className='text-app-xl'>Dollar Cost Average</h3>
            </div>
            <Select
                variant={Select.variants.LABEL_LEFT}
                label='Currency'
                options={['USD', 'EUR', 'BGN']}
            />
        </div>
    );
});
