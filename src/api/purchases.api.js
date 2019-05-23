import axios from 'axios';

export function getPurchases() {
  return axios({
    url: 'http://localhost:4000/graphql',
    method: 'post',
    data: {
      query: `
        {
          payments {
            balance
            supermarket
            date
            hour
            electronicBill
            products{
              description
              count
              balance
              picture
              unit
            }
          }
        }
      `
    }
  });
}