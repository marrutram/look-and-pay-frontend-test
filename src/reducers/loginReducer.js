const initialState = {
  loading: false,
  login: [],
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
        login: [...state.login, action.payload]
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