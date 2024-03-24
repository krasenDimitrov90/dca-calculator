import React from 'react';
import './Navigation.styles.css';

export const Navigation = ({ chartIsShown, onShow, onHide }) => {


  return (
    <div className='portfolio-navigation'>
      <button onClick={onShow} className={'chart-btn ' + (chartIsShown ? 'portfolio-btn-active' : '') }>Portfolio Chart</button>
      <button onClick={onHide} className={'table-btn ' + (!chartIsShown ? 'portfolio-btn-active' : '')}>Portfolio Table</button>
    </div>
  );
};
