import axios from 'axios';
import { setAlert } from './alert';
import { GET_COMPANY, COMPANY_ERROR, UPDATE_COMPANY } from './types';

// Get the current users company
export const getCurrentCompany = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/company/me');

    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add or update company
export const addCompany = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/company', formData, config);

    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Company Updated' : 'Company Added', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add receipt
export const addReceipt = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/company/receipts', formData, config);

    dispatch({
      type: UPDATE_COMPANY,
      payload: res.data,
    });

    dispatch(setAlert('Receipt Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
