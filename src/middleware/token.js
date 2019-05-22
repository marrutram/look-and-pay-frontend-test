import axios from 'axios';
import { get } from 'lodash';

export function setToken(store) {
  axios.interceptors.request.use( (config) => {
      const token = get( store.getState().loginState, 'login.token');
      config.headers.Authorization =  token;
      return config;
  });
}
