import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";
import {loadState} from './localStore'

const initialData = loadState();
function configureStore() {
  return createStore(rootReducer, initialData, compose(applyMiddleware(thunk)));
}
export default configureStore;
