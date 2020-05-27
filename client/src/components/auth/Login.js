import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// For Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  // Set form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Set form data to formData object
  const { email, password } = formData;

  // Set form data on any change
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            required
            name='email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// To get the auth state
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// For adding in redux
export default connect(mapStateToProps, { login })(Login);
