import React from 'react';

export const dollar = React.memo(() => {
    return (
        <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            {/* <!-- Circle with only green color --> */}
            <circle cx="250" cy="250" r="200" stroke="#CE6192" stroke-width="40" fill="#CE6192"></circle>

            {/* <!-- Larger second SVG centered within the circle --> */}
            <svg x="100" y="100" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        </svg>
    );
});
