import axios from 'axios';


export function createrPay(arg) {
  console.log("arg::", arg);
  return axios({
    url: 'http://localhost:4000/graphql',
    method: 'post',
    data: {
      query: `
        mutation(){
          createPayment(
            supermarket: "${arg.supermarket}",
            electronicBill: "${arg.electronicBill}",
            date: "${arg.date}",
            hour: "${arg.hour}",
            balance: "${arg.balance}",
            products: ${JSON.stringify(arg.products)},
            userImage: "${arg.userImage}",
            )
        }
      `
    }
  });
}