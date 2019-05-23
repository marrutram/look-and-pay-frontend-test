import axios from 'axios';
import {URL_API} from '../constante/urlAPI';

export function createrPay(arg) {
  return axios({
    url: `${URL_API}`,
    method: 'post',
    data: {
      query: `
      mutation(
        $balance: String!,
        $electronicBill: String!,
        $supermarket: String!,
        $date: String,
        $userImage: String!,
        $hour: String,
        $products: [ProductInput], ){
       
        createPayment(
          balance: $balance,
          userImage: $userImage,
          electronicBill: $electronicBill,
          supermarket: $supermarket,
          date: $date,
          hour: $hour,
          products: $products)
       }
      `,
      variables: arg
    }
  });
}
