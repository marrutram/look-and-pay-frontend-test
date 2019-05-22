import { LOGIN_SUCCESS, LOGIN_STARTED, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../constante/typeAction';
const initialState = {
  loading: false,
  login: null,
  isAuthenticated: false,
  error: null
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
        login: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        login: null,
        isAuthenticated: false,
        error: null
      };
    default:
      return state;
  }
}