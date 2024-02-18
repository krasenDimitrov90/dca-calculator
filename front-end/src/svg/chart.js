import React from 'react';

export const chart = React.memo(() => {
    return (
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            {/* <!-- Circle with only green color --> */}
            <circle cx="250" cy="250" r="200" stroke="#666EC0" stroke-width="40" fill="#666EC0" />

            {/* <!-- Larger second SVG centered within the circle --> */}
            <svg x="100" y="100" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        </svg>
    );
});
