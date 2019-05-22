import UserPage from "../views/UserPage/UserPage.jsx";
import NfcPage from "../views/NfcPage/NfcPage.jsx";

var dashRoutes = [
  {
    path: "/supermarket-test",
    name: "Supermarket Test",
    icon: "nc-icon nc-cart-simple",
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
