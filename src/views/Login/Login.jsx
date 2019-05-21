import React from "react";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import { loginAction } from '../../actions/loginAction';
import CardAuthor from "../../components/CardElements/CardAuthor.jsx";
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import imagenHeaderLogin from "../../assets/img/lider.jpg";
import mike from "../../assets/img/mike.jpg";
import NotificationAlert from "react-notification-alert";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }
  onDismiss() {}
  notify(place) {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Paper Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({email: event.target.elements.email.value, password: event.target.elements.password.value});
    this.props.onLogin(this.state);
  }
  
  render() {
    const { loginState } = this.props;
    if (loginState.isAuthenticated) {
      return <Redirect from="/" to="/user-page"/>;
    }
    return (
      <div className="content">
        <NotificationAlert ref="notificationAlert" />
        <div className="row margen-row-login">
          <Col md={4}></Col>
          <Col md={4} xs={12}>
            <Card className="card-user">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="image">
                  <img src={imagenHeaderLogin} alt="..." />
                </div>
                <CardBody>
                  <CardAuthor
                    avatar={mike}
                    avatarAlt="..."
                    title="Bienvenido"
                    description="Look & Pay"
                  />
                  
                    <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                          label: "Email address",
                          inputProps: {
                            type: "email",
                            name:"email",
                            placeholder: "Email"
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
                            placeholder: "Password"
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
