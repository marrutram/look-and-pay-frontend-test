import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer";
// we need to pass the initial state with the new look
function configureStore(state = { bgState: {bgColor: "black"}, activeState: {activeColor: "info"} }) {
  return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;
