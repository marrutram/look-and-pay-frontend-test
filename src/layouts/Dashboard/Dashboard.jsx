import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.jsx";
import dashboardRoutes from "../../routes/dashboard.jsx";
import { connect } from 'react-redux';
var ps;
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {loginState: { isAuthenticated }} = props;
    if (typeof isAuthenticated === 'boolean') {
      return Object.assign({}, state, {auth: isAuthenticated});
    }
    return state
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  render() {
    const { auth } = this.state;
    if (!auth) {
      return <Redirect from="/" to="/login"/>;
    }
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={dashboardRoutes}
        />
        <div className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.pro) {
                return null;
              }
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              }
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>
        <FixedPlugin />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(Dashboard);