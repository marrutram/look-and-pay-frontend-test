import axios from 'axios';

export function createrPay(arg) {
  console.log("arg::", arg);
  return axios({
    url: 'http://localhost:4000/graphql',
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
