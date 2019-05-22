import React from "react";
import { connect } from 'react-redux';
import { logoutAction } from '../../actions/loginAction';

class Logout extends React.Component {

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return  null;
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(logoutAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
