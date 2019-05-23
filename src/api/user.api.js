import axios from 'axios';

export function signup(arg) {
  console.log("arg::", arg);
  return axios({
    url: 'http://localhost:4000/graphql',
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
    url: 'http://localhost:4000/graphql',
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