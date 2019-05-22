import SupermarketTest from "../views/SupermarketTest/SupermarketTest.jsx";
import HomePage from "../views/Home/HomePage.jsx";
import MyPurchases from "../views/MyPurchases/MyPurchases";
import Logout from "../views/Logout/Logout";

var dashRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
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
    icon: "nc-icon nc-bullet-list-67",
    component: MyPurchases
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon  nc-button-power",
    component: Logout
  },
 
  
];
export default dashRoutes;
