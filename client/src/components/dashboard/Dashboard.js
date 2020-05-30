// Main Dashboard Component

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentCompany } from '../../actions/company';

const Dashboard = ({ getCurrentCompany, auth, company }) => {
  // Call to get current profile on page load
  useEffect(() => {
    getCurrentCompany();
  }, []);
  return <div>Dashboard</div>;
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
