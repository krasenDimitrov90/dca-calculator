// App.js
import React from 'react';
import * as Pages from './pages/index';

import { useSelector } from 'react-redux';

const App = () => {

    const appIsLoading = useSelector(state => state.appLoading.appIsLoading);
    console.log({ appIsLoading })

    return (
        <div className='flex flex-1 relative'>
            {/* {appIsLoading && <div className='bg-white fix top-0 left-0'>Loading....</div>} */}
            {appIsLoading && <div className='bg-black text-white text-app-3xl flex justify-center items-center z-[1060] opacity-[0.5] absolute top-0 left-0 bottom-0 right-0'>Loading....</div>}
            <Pages.Calculator />
        </div>
    );
};

export default App;
