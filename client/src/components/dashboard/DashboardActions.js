import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-company' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Company
      </Link>
      <Link to='/add-receipt' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Add Receipt
      </Link>
      <Link to='edit-receipt' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Edit Receipt
      </Link>
    </div>
  );
};
