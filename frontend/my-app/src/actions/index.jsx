import axios from 'axios';

export const fetchUserData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://api.example.com/users');
      dispatch({ type: 'FETCH_USER_DATA_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_DATA_FAILURE', payload: error.message });
    }
  };
};