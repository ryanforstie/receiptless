import React from 'react';
import { Link } from 'react-router-dom';

// Functional component
export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Receiptless</Link>
      </h1>
      <ul>
        <li>
          <Link to='!#'>Companies</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
      </ul>
    </nav>
  );
};
