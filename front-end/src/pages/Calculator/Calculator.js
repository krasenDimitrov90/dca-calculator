import React from 'react';
import './Calculator.styles.css';
import { Navigation } from '../../components/Navigation/Navigation';

export const Calculator = React.memo(() => {
    return (
        <div>
            <Navigation />
        </div>
    );
});
