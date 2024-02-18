import React from 'react';
import './SettingsNavigation.styles.css'

export const SettingsNavigation = React.memo(() => {
    return (
        <div className='settings-navigation-container custom-gradient-secondary'>
            <div className='flex mb-app-lg text-app-text-primary'>
                <p>Settings</p>
            </div>

            <div>
                <label for="purchaseAmount" className='font-bold text-app-text-secondary '>Purchase amount:</label>
                <div className='flex'>
                    <input type="number" name="purchaseAmount" required
                        className='flex-1 rounded-l-app-s outline-none bg-app-purple pl-app-base text-app-text-primary'
                     />
                    <div className='py-app-s px-app-sm bg-[#444788] font-bold text-app-text-secondary rounded-r-app-s flex justify-center'>
                        <p>USD</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
