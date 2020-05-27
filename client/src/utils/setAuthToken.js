import axios from 'axios';

const setAuthToken = (token) => {
  // If token exist add to header
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;

    // If token does not exist delete from header
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
