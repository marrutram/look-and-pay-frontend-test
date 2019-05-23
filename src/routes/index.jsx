import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
import Login from "../views/Login/Login.jsx";
import Registry from "../views/Registry/Registry";
import SupermarketTest from "../views/SupermarketTest/SupermarketTest.jsx";

var indexRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/registry",
    name: "Registry",
    component: Registry
  },
  {
    path: "/public-supermarket-test",
    name: "Supermarket Test",
    component: SupermarketTest
  },
  { 
    path: "/", 
    name: "Home", 
    component: Dashboard 
  }
];

export default indexRoutes;
