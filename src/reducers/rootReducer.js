import { combineReducers } from 'redux';
import bgReducer from './bgReducer';
import colorReducer from './colorReducer';
import loginReducer from './loginReducer';
export default combineReducers({
  activeState: colorReducer,
  bgState: bgReducer,
  loginState: loginReducer
});
