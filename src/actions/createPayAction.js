import { createrPay } from '../api/pay.api';
import { CREATER_PAY_SUCCESS, CREATER_PAY_STARTED, CREATER_PAY_FAILURE } from '../constante/typeAction';
import { get } from 'lodash';

export const createPayAction = (data) => {
  return dispatch => {
    dispatch(createPayStarted());

    createrPay(data)
      .then(res => {
        if(get(res, 'data.errors')) {
          dispatch(createPayFailure(get(res, 'data.errors[0].message')));
        } else {
          dispatch(createPaySuccess(get (res, 'data.data')));
        }
      })
      .catch(err => {
        dispatch(createPayFailure(err.message));
      });
  };
};

export const clearPayAction = () => {
  return dispatch => {
    dispatch(createPayFailure(null));
    dispatch(createPaySuccess(null));
  };
};

const createPaySuccess = todo => ({
  type: CREATER_PAY_SUCCESS,
  payload: todo
});

const createPayStarted = () => ({
  type: CREATER_PAY_STARTED
});

const createPayFailure = error => ({
  type: CREATER_PAY_FAILURE,
  payload: {
    error
  }
});