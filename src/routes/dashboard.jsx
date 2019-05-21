import UserPage from "../views/UserPage/UserPage.jsx";
import NfcPage from "../views/NfcPage/NfcPage.jsx";

var dashRoutes = [
  {
    path: "/user-page",
    name: "Usuario",
    icon: "nc-icon nc-single-02",
    component: UserPage
  },
  {
    path: "/nfc-rfid",
    name: "NFC RFID",
    icon: "nc-icon nc-zoom-split",
    component: NfcPage
  }
];
export default dashRoutes;
