import React from 'react';
import './Navigation.styles.css';
import * as SVG from '../../svg/index';

export const Navigation = React.memo(() => {
    return (
        <div className='flex justify-between text-app-text-primary py-app-base'>
            <div className='flex items-end'>
                <div className='flex items-end h-full gap-[6px] py-[3px] mr-app-base'>
                    <span className='flex bg-[#737CD9] h-[25%] w-[3px] rounded'></span>
                    <span className='flex bg-[#737CD9] h-[60%] w-[3px] rounded'></span>
                    <span className='flex bg-[#737CD9] h-[96%] w-[3px] rounded'></span>
                </div>
                <h3 className='text-app-xl'>Dollar Cost Average</h3>
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
