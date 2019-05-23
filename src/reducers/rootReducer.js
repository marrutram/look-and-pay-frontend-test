import { combineReducers } from 'redux';
import bgReducer from './bgReducer';
import colorReducer from './colorReducer';
import loginReducer from './loginReducer';
import registryReducer from './registryReducer';
import createPayReducer from './createPayReducer';
import myPurchasesReducer from './myPurchases';

export default combineReducers({
  activeState: colorReducer,
  bgState: bgReducer,
  loginState: loginReducer,
  registryState: registryReducer,
  createPayState: createPayReducer,
  myPurchasesState: myPurchasesReducer
});
