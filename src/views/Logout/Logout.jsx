import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {

  componentDidMount() {
    localStorage.removeItem('state');
  }

  render() {
    return  <Redirect from="/" to="/login"/>;
  }
}

export default Logout;
