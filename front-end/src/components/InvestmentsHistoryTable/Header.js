import React from 'react';

export const Header = () => {
  return (
    <thead className='custom-gradient-secondary'>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Btc price</th>
        <th scope="col">Btc purchased</th>
        <th scope="col">Total Cost</th>
        <th scope="col">Balance</th>
      </tr>
    </thead>
  );
};
