import React from 'react';
import './PortfolioChart.styles.css';

const Row = () => {
    return (
        <tr>
            <td data-label="Date">04/01/2016</td>
            <td data-label="Btc price">30,234</td>
            <td data-label="Invested">$1,190</td>
            <td data-label="Btc purchesed">0.003</td>
            <td data-label="Balance">$145</td>
        </tr>
    );
};

export const PortfolioChart = React.memo(() => {
    return (
        <div className='portfolio-table-container'>
            <table className='portfolio-table'>
                <thead className='custom-gradient-secondary'>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Btc price</th>
                        <th scope="col">Invested</th>
                        <th scope="col">Btc purchesed</th>
                        <th scope="col">Balance</th>
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
        </div>
    );
});
