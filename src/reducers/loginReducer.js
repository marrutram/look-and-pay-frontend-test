const initialState = {
  loading: false,
  login: [],
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
        error: null,
        login: [...state.login, action.payload]
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}