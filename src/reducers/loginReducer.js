const initialState = {
  loading: false,
  login: null,
  isAuthenticated: false,
  error: null
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_STARTED":
      return {
        ...state,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
        login: action.payload?action.payload:state.login
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}