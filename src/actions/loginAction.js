import { login } from '../api/user.api';

export const loginAction = (data) => {
  return dispatch => {
    dispatch(loginStarted());

    login(data)
      .then(res => {
        dispatch(loginSuccess(res.data));
      })
      .catch(err => {
        console.log("err::", err);
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