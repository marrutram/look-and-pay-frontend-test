import UserPage from "../views/UserPage/UserPage.jsx";

var dashRoutes = [
  {
    path: "/user-page",
    name: "Usuario",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },
  { redirect: true, path: "/", pathTo: "/user-page", name: "User Profile" }
];
export default dashRoutes;
