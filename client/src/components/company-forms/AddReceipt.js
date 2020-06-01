import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReceipt } from '../../actions/company';

const AddReceipt = ({ addReceipt, history }) => {
  const [formData, setFormData] = useState({
    date: '',
    merchant: '',
    description: '',
    amount: '',
  });

  // Deconstruct the data
  const { date, merchant, description, amount } = formData;

  // Set the form fields when user changes them
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add a Receipt</h1>
      <p className='lead'>
        <i className='fas fa-receipt'></i> Add any paper receipts that you have
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addReceipt(formData, history);
        }}
      >
        <div className='form-group'>
          <h4>Date</h4>
          <input
            type='date'
            name='date'
            value={date}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Merchant'
            name='merchant'
            value={merchant}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Description'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Amount'
            name='amount'
            value={amount}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddReceipt.propTypes = {
  addReceipt: PropTypes.func.isRequired,
};

export default connect(null, { addReceipt })(AddReceipt);
