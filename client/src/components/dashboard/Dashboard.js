// Main Dashboard Component

import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getCurrentCompany } from '../../actions/company';

const Dashboard = ({
  getCurrentCompany,
  auth: { user },
  company: { company, loading },
}) => {
  // Call to get current profile on page load
  useEffect(() => {
    getCurrentCompany();
  }, []);
  return loading && company === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {company !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not set up a company, please set one up.</p>
          <Link to='/create-company' className='btn btn-primary my-1'>
            Create Company
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  company: state.company,
});

export default connect(mapStateToProps, { getCurrentCompany })(Dashboard);
