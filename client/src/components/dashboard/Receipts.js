import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Receipts = ({ receipts }) => {
  // Map through receipts array and display in table body
  const allReceipts = receipts.map((receipt) => (
    <tr key={receipt._id}>
      <td>
        <Moment format='YYYY/MM/DD'>{receipt.date}</Moment>
      </td>
      <td className='hide-sm'>{receipt.merchant}</td>
      <td className='hide-sm'>{receipt.description}</td>
      <td className='hide-sm'>{receipt.amount}</td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Receipts</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Date</th>
            <th className='hide-sm'>Merchant</th>
            <th className='hide-sm'>Description</th>
            <th className='hide-sm'>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>{allReceipts}</tbody>
      </table>
    </Fragment>
  );
};

Receipts.propTypes = {
  receipts: PropTypes.array.isRequired,
};

export default Receipts;
