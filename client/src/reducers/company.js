// Company Reducer

import { GET_COMPANY, COMPANY_ERROR } from '../actions/types';

const initialState = {
  company: null,
  companies: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false,
      };
    case COMPANY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
