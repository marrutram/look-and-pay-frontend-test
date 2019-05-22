import { CREATER_PAY_SUCCESS, CREATER_PAY_STARTED, CREATER_PAY_FAILURE } from '../constante/typeAction';

const initialState = {
  loading: false,
  pay: null,
  error: null,
  isPay: false
};

export default function createPayReducer(state = initialState, action) {
  switch (action.type) {
    case CREATER_PAY_STARTED:
      return {
        ...state,
        loading: true,
        isPay: false,
        error: null,
      };
    case CREATER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        pay: action.payload,
        isPay: true
      };
    case CREATER_PAY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        isPay: false
      };
    default:
      return state;
  }
}