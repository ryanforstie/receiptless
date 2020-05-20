// Dispatch the reducers for alert

import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => (dispatch) => {
  // Get random id
  const id = uuidv4();

  // Call reducer
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // Remove the alert after five seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
