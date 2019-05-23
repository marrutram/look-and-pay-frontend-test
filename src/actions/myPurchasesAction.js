import { getPurchases } from '../api/purchases.api';
import { GET_PURCHASES_SUCCESS, GET_PURCHASES_STARTED, GET_PURCHASES_FAILURE } from '../constante/typeAction';
import { get } from 'lodash';

export const getPurchasesAction = () => {
  return dispatch => {
    dispatch(getPurchasesStarted());

    getPurchases()
      .then(res => {
        if(get(res, 'data.errors')) {
          dispatch(getPurchasesError(get(res, 'data.errors[0].message')));
        } else {
          dispatch(getPurchasesSuccess(get (res, 'data.data')));
        }
      })
      .catch(err => {
        dispatch(getPurchasesError(err.message));
      });
  };
};

export const clearError = () => {
  return dispatch => {
    dispatch(getPurchasesError(null));
  };
};

const getPurchasesSuccess = todo => ({
  type: GET_PURCHASES_SUCCESS,
  payload: todo
});

const getPurchasesStarted = () => ({
  type: GET_PURCHASES_STARTED
});

const getPurchasesError = error => ({
  type: GET_PURCHASES_FAILURE,
  payload: {
    error
  }
});