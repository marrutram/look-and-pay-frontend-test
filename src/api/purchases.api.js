import axios from 'axios';
import {URL_API} from '../constante/urlAPI';

export function getPurchases() {
  return axios({
    url: `${URL_API}`,
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