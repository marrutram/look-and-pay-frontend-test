import { combineReducers } from 'redux';
import bgReducer from './bgReducer';
import colorReducer from './colorReducer';
export default combineReducers({
  activeState: colorReducer,
  bgState: bgReducer
});
