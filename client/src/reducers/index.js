// Index reducer

import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import company from './company';

// Root reducer to handle all other reducers
export default combineReducers({ alert, auth, company });
