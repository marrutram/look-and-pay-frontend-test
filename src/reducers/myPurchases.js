import { GET_PURCHASES_SUCCESS, GET_PURCHASES_STARTED, GET_PURCHASES_FAILURE } from '../constante/typeAction';
const initialState = {
  loading: false,
  purchases: null,
  error: null
};

export default function myPurchasesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PURCHASES_STARTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_PURCHASES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        purchases: action.payload
      };
    case GET_PURCHASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}