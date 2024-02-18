import React from 'react';

export const arrowUp = React.memo(() => {
    return (
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            {/* <!-- Circle with only green color --> */}
            <circle cx="250" cy="250" r="200" stroke="#64CFB5" stroke-width="40" fill="#64CFB5"></circle>

            {/* <!-- Replace the Larger second SVG with the provided SVG --> */}
            <svg x="100" y="100" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
        </svg>
    );
});
