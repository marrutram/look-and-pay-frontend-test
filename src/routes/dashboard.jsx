import SupermarketTest from "../views/SupermarketTest/SupermarketTest.jsx";
import HomePage from "../views/Home/HomePage.jsx";
import MyPurchases from "../views/MyPurchases/MyPurchases";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-cart-simple",
    component: HomePage
  },
  {
    path: "/supermarket-test",
    name: "Supermarket Test",
    icon: "nc-icon nc-cart-simple",
    component: SupermarketTest
  },
  {
    path: "/my-purchases",
    name: "My Purchases",
    icon: "nc-icon nc-cart-simple",
    component: MyPurchases
  },
  
];
export default dashRoutes;
