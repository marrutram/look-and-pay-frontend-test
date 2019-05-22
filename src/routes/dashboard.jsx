import SupermarketTest from "../views/SupermarketTest/SupermarketTest.jsx";
import HomePage from "../views/Home/HomePage.jsx";
import MyPuchases from "../views/MyPuchases/MyPuchases";

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
    path: "/my-puchases",
    name: "My Puchases",
    icon: "nc-icon nc-cart-simple",
    component: MyPuchases
  },
  
];
export default dashRoutes;
