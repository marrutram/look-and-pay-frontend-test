import axios from 'axios';

export function setToken(store) {
  axios.interceptors.request.use( (config) => {
      const token = store.getState().loginState.login;
      config.headers.Authorization =  token;
      return config;
  });
}
