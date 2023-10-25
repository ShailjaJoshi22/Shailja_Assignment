// reducers.js
const initialState = {
    userData: [],
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_DATA_SUCCESS':
        return { ...state, userData: action.payload, error: null };
      case 'FETCH_USER_DATA_FAILURE':
        return { ...state, userData: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  