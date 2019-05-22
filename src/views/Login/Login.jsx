import React from "react";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import { loginAction, clearErrorLoginAction, logoutAction } from '../../actions/loginAction';
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import imagenHeaderLogin from "../../assets/img/logo.svg";
import NotificationAlert from "react-notification-alert";
import { Redirect } from "react-router-dom";
import { get } from "lodash";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      isRegistry: false
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }
  onDismiss() {}
  componentDidMount() {
    this.props.onLogout();
  }
  notify(error) {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
             <b>Error in Login</b> <br/> {error}
          </div>
        </div>
      ),
      type: "danger",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 3
    };
    if(get(this.refs, 'notificationAlert')){
      this.refs.notificationAlert.notificationAlert(options);
    }
  }

  messageError() {
    if(!this.props.loginState.loading && this.props.loginState.error != null) {
      this.notify(this.props.loginState.error);
      this.props.clearErrorLogin();
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({email: event.target.elements.email.value, password: event.target.elements.password.value});
    this.props.onLogin(this.state);
  }
  
  async onRegistry() {
    await this.setState({isRegistry: true});
  }

  render() {
    const { loginState } = this.props;
    if (loginState.isAuthenticated) {
      return <Redirect from="/" to="/home"/>;
    }

    const { isRegistry } = this.state;
    if (isRegistry) {
      return <Redirect from="/" to="/registry"/>;
    }
  
    this.messageError();
  
    return (
      <div className="content">
        <NotificationAlert ref="notificationAlert" />
        <div className="row margen-row-login mt-4">
          <Col md={4}></Col>
          <Col md={4} xs={12}>
            <Card className="card-user">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="image header-login">
                  <img className="header-login-img" src={imagenHeaderLogin} alt="..." />
                </div>
                <CardBody>
                  
                    <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                          label: "Email address",
                          inputProps: {
                            type: "email",
                            name:"email",
                            placeholder: "Email",
                            required:true,
                            }
                          }
                        ]}
                    />
                    <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                          label: "Password",
                          inputProps: {
                            type: "password",
                            name: "password",
                            placeholder: "Password",
                            required:true,
                            }
                          }
                        ]}
                    />
                    <span className="text-danger">
                      <small>
                        {this.props.loginState.error}
                      </small>
                    </span>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className="ml-auto">
                        <Button
                          color="primary"
                          block
                          type="submit"
                        >
                          Login
                        </Button>
                      </Col>
                      <hr />
                      <Col xs={12} pr={1} pl={1} sm={12} md={12} lg={12} className="ml-auto">
                         <span className="text-right">
                          <small>
                          You do not have an account?
                          </small>
                        </span>
                        <Button
                          color="warning"
                          block
                          onClick={() => this.onRegistry()}
                        >
                          Registry
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </Col>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ({email, password}) => {
      dispatch(loginAction({email, password}));
    },
    clearErrorLogin: () => {
      dispatch(clearErrorLoginAction());
    },
    onLogout: () => {
      dispatch(logoutAction())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
