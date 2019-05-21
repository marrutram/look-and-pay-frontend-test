import { login } from '../api/user.api';
import { get } from 'lodash';

export const loginAction = (data) => {
  return dispatch => {
    dispatch(loginStarted());

    login(data)
      .then(res => {
        if(get(res, 'data.errors')) {
          dispatch(loginFailure(get(res, 'data.errors[0].message')));
        } else {
          dispatch(loginSuccess(res.data));
        }
      })
      .catch(err => {
        dispatch(loginFailure(err.message));
      });
  };
};

const loginSuccess = todo => ({
  type: "LOGIN_SUCCESS",
  payload: {
    ...todo
  }
});

const loginStarted = () => ({
  type: "LOGIN_STARTED"
});

const loginFailure = error => ({
  type: "LOGIN_FAILURE",
  payload: {
    error
  }
});