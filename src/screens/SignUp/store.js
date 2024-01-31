// store.js
import { createStore } from 'redux';

const initialState = {
  dedicatedAccountId: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DEDICATED_ACCOUNT_ID':
      return {
        ...state,
        dedicatedAccountId: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
