import React from 'react';

// Functional component
export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='index.html'>Receiptless</a>
      </h1>
      <ul>
        <li>
          <a href='companies.html'>Companies</a>
        </li>
        <li>
          <a href='login.html'>Login</a>
        </li>
        <li>
          <a href='signup.html'>Signup</a>
        </li>
      </ul>
    </nav>
  );
};
