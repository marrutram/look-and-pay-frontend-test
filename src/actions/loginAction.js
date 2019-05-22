import { login } from '../api/user.api';
import { LOGIN_SUCCESS, LOGIN_STARTED, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../constante/typeAction';
import { get } from 'lodash';

export const loginAction = (data) => {
  return dispatch => {
    dispatch(loginStarted());

    login(data)
      .then(res => {
        console.log("res::", res);
        if(get(res, 'data.errors')) {
          dispatch(loginFailure(get(res, 'data.errors[0].message')));
        } else {
          dispatch(loginSuccess(get (res, 'data.data.login')));
        }
      })
      .catch(err => {
        console.log("err::", err);
        dispatch(loginFailure(err.message));
      });
  };
};

export const logoutAction = () => {
  return dispatch => {
    dispatch(logoutSuccess())
  }
}

export const clearErrorLoginAction = () => {
  return dispatch => {
    dispatch(loginFailure(null));
  };
};

const loginSuccess = todo => ({
  type: LOGIN_SUCCESS,
  payload: todo
});

const loginStarted = () => ({
  type: LOGIN_STARTED
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});