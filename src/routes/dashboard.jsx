import SupermarketTest from "../views/SupermarketTest/SupermarketTest.jsx";
import HomePage from "../views/Home/HomePage.jsx";

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
  }
];
export default dashRoutes;
