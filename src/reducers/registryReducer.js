import { REGISTRY_SUCCESS, REGISTRY_STARTED, REGISTRY_FAILURE } from '../constante/typeAction';
const initialState = {
  loading: false,
  registry: null,
  error: null,
  isRegistry: false
};

export default function registryReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRY_STARTED:
      return {
        ...state,
        loading: true,
        isRegistry: false,
        error: null,
      };
    case REGISTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        registry: action.payload?action.payload:state.login,
        isRegistry: true
      };
    case REGISTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        isRegistry: false
      };
    default:
      return state;
  }
}