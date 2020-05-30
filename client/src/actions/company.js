import axios from 'axios';
import { setAlert } from './alert';
import { GET_COMPANY, COMPANY_ERROR } from './types';

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
