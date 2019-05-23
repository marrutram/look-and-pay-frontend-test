import axios from 'axios';
import {URL_API} from '../constante/urlAPI';

export function signup(arg) {
  return axios({
    url: `${URL_API}`,
    method: 'post',
    data: {
      query: `
        mutation {
          signup(
            email: "${arg.email}", 
            password: "${arg.password}",
            name: "${arg.name}",
            lastname: "${arg.lastName}",
            urlImagen: "${arg.urlImagen}"
          ){
            name
            lastname
            email
            token
            urlImagen
          }
        }
      `
    }
  });
}

export function login(arg) {
  return axios({
    url: `${URL_API}`,
    method: 'post',
    data: {
      query: `
        mutation {
          login(
            email: "${arg.email}", 
            password: "${arg.password}"
          ){
            name
            lastname
            email
            token
            urlImagen
          }
        }
      `
    }
  });
}