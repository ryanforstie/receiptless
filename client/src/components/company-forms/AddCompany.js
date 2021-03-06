import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCompany } from '../../actions/company';

const AddCompany = ({ addCompany, history }) => {
  // Form data
  const [formData, setFormData] = useState({
    industry: '',
    company: '',
    website: '',
    location: '',
    bio: '',
  });

  // Deconstruct
  const { industry, company, website, location, bio } = formData;

  // Update form inputs on any changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addCompany(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Company</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Add some general information about your
        company
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='industry'
            value={industry}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* Select Company Industry</option>
            <option value='Finance'>Finance</option>
            <option value='Software'>Software</option>
            <option value='Retail'>Retail</option>
            <option value='Construction'>Construction</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Pick the best match that your company falls under
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company Name'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>What is the company name</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>What is the company website</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>(eg. Seattle, WA)</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of the company'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>What does the company do</small>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddCompany.propTypes = {
  addCompany: PropTypes.func.isRequired,
};

export default connect(null, { addCompany })(withRouter(AddCompany));
