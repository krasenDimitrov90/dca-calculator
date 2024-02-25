import React from 'react';
import './PortfolioChart.styles.css';

const Row = () => {
    return (
        <tr>
            <td data-label="Account">Visa - 3412</td>
            <td data-label="Due Date">04/01/2016</td>
            <td data-label="Amount">$1,190</td>
            <td data-label="Period">03/01/2016 - 03/31/2016</td>
        </tr>
    );
};

export const PortfolioChart = React.memo(() => {
    return (
        // <div className='portfolio-chart-container'>
        <table className='portfolio-table'>
            <thead>
                <tr>
                    <th scope="col">Account</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Period</th>
                </tr>
            </thead>
            <tbody>
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
                <Row />
            </tbody>
        </table>
        // </div>
    );
});
