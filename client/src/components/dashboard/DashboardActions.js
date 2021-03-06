import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-company' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Company
      </Link>
      <Link to='/add-receipt' className='btn btn-light'>
        <i className='fas fa-scroll text-primary'></i> Add Receipt
      </Link>
    </div>
  );
};

export default DashboardActions;
