import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Goodbye Paper Receipts</h1>
          <p className='lead'>Never worry about paper receipts again.</p>
          <div className='buttons'>
            <Link to='/signup' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
