import axios from 'axios';

export function signup(arg) {
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
            lastnanme: "${arg.lastnanme}",
            urlImagen: "${arg.urlImagen}"
          )
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
          )
        }
      `
    }
  });
}