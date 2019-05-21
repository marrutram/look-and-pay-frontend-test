import { signup } from '../api/user.api';
import { LOGIN_SUCCESS, REGISTRY_SUCCESS, REGISTRY_STARTED, REGISTRY_FAILURE } from '../constante/typeAction';
import { get } from 'lodash';

export const registryAction = (data) => {
  return dispatch => {
    dispatch(registryStarted());

    signup(data)
      .then(res => {
        if(get(res, 'data.errors')) {
          dispatch(registryFailure(get(res, 'data.errors[0].message')));
        } else {
          dispatch(registrySuccess(get (res, 'data.data.registry')));
          dispatch(loginSuccess(get (res, 'data.data.registry')));
        }
      })
      .catch(err => {
        dispatch(registryFailure(err.message));
      });
  };
};

const loginSuccess = todo => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...todo
  }
});

const registrySuccess = todo => ({
  type: REGISTRY_SUCCESS,
  payload: {
    ...todo
  }
});

const registryStarted = () => ({
  type: REGISTRY_STARTED
});

const registryFailure = error => ({
  type: REGISTRY_FAILURE,
  payload: {
    error
  }
});