import React from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Row, Col } from "reactstrap";
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import NotificationAlert from "react-notification-alert";
import { registryAction } from '../../actions/registryAction';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { get } from 'lodash';
import registryLogo from "../../assets/img/logo.svg";

class Registry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      isCamara: false,
      isPerfil: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }

  messageError() {
    if(!this.props.registryState.isRegister && !this.props.registryState.loading && this.props.registryState.error != null) {
      this.notify(this.props.registryState.error)
    }
  }

  async onTakePhoto (dataUri) {
    await this.setState({
      urlImagen: dataUri,
      isCamara: false,
      isPerfil: true
    });
    this.props.onRegistry(this.state);

  }
 
  onCameraError (error) {
    console.error('onCameraError', error);
  }
 
  onCameraStart (stream) {
    console.log('onCameraStart');
  }
 
  onCameraStop () {
    console.log('onCameraStop');
  }

  onDismiss() {}

  notify(error) {
    const options = {
      place: "tc",
      message: (
        <div>
          <div>
             <b>Error in registry</b> <br/> {error}
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

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({
      name: event.target.elements.name.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      nameCard: event.target.elements.nameCard.value,
      numberCard: event.target.elements.numberCard.value,
      expDateCard: event.target.elements.expDateCard.value,
      isCamara: true,
      isPerfil: false
    });
  }

  render() {
    const { isCamara, isPerfil } = this.state;

    const { loginState , registryState} = this.props;

    if (loginState.isAuthenticated) {
      return <Redirect from="/" to="/home"/>;
    }

    if (isCamara ) {
      return (
        <div className="content">
        <NotificationAlert ref="notificationAlert" />
          <Row>
            <Col md={2}></Col>
            <Col md={8} xs={12}>
              <Card className="card-user logo-look-register-card"> 
                <CardHeader className="logo-look-register">
                    <div className="image">
                      <img className="logo-look-register-img" src={registryLogo} alt="..." />
                    </div>
                    </CardHeader>
                <CardBody>
                <h5> Registry </h5>
                  <Camera
                    onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                    onCameraError = { (error) => { this.onCameraError(error); } }
                    idealFacingMode = {FACING_MODES.USER}
                    idealResolution = {{width: 640, height: 480}}
                    imageType = {IMAGE_TYPES.JPG}
                    imageCompression = {0.97}
                    isMaxResolution = {false}
                    isImageMirror = {false}
                    isSilentMode = {true}
                    isDisplayStartCameraError = {true}
                    isFullscreen = {false}
                    sizeFactor = {1}
                    onCameraStart = { (stream) => { this.onCameraStart(stream); } }
                    onCameraStop = { () => { this.onCameraStop(); } }
                  />
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
        </Row>
      </div>
    )
    }
    if(isPerfil || !registryState.isRegistry) {
      this.messageError();
      return (
        <div className="content">
          <NotificationAlert ref="notificationAlert" />
          
          <div className="row margen-row-login">
             <Col md={2}></Col>
              <Col md={8} pl={1} xs={12}>
                <Card className="card-user">
                    <CardHeader className="logo-look-register">
                    <div className="image">
                      <img className="logo-look-register-img" src={registryLogo} alt="..." />
                    </div>
                    </CardHeader>
                    <CardBody>
                      <h5> Registry </h5>
                      <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormInputs
                          ncols={["col-md-6 col-xs-12", "col-md-6 col-xs-12"]}
                          proprieties={[
                            {
                              label: "Name",
                              inputProps: {
                                type: "text",
                                name: "name",
                                placeholder: "Name",
                                required:"true",
                                defaultValue: this.state.name
                              }
                            },
                            {
                              label: "Last Name",
                              inputProps: {
                                type: "text",
                                name: "lastName",
                                placeholder: "Last Name",
                                required:"true",
                                defaultValue: this.state.lastName
                              }
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-6 col-xs-12", "col-md-6  col-xs-12"]}
                          proprieties={[
                            {
                              label: "Email address",
                              inputProps: {
                                type: "email",
                                name: "email",
                                placeholder: "Email",
                                required:"true",
                                defaultValue: this.state.email
                              }
                            },
                            {
                              label: "Password",
                              inputProps: {
                                type: "password",
                                name: "password",
                                placeholder: "Password",
                                required:"true",
                                defaultValue: this.state.password
                                }
                              }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-4  col-xs-12", "col-md-4  col-xs-12", "col-md-4  col-xs-12"]}
                          proprieties={[
                            {
                              label: "Name on Card",
                              inputProps: {
                                type: "text",
                                name: "nameCard",
                                placeholder: "Name on Card",
                                required:"true",
                                defaultValue: this.state.nameCard
                              }
                            },
                            {
                              label: "Card Number",
                              inputProps: {
                                type: "text",
                                name: "numberCard",
                                placeholder: "Card Number",
                                required:"true",
                                defaultValue: this.state.numberCard
                              }
                            },
                            {
                              label: "Expirate Date",
                              inputProps: {
                                type: "number",
                                name: "expDateCard",
                                placeholder: "Expirate Date",
                                required:"true",
                                defaultValue: this.state.expDateCard
                              }
                            }
                          ]}
                        />
                        <Row>
                        <Col md={12}>
                          <span className="text-danger">
                            <small>
                              {registryState.error}
                            </small>
                          </span>
                        </Col>
                          <div className="update ml-auto mr-auto">
                            <Button color="primary" round>Next</Button>
                          </div>
                        </Row>
                      </form>
                    </CardBody>
                </Card>
              </Col>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
    onRegistry: ({email, password, lastName, urlImagen, nameCard, numberCard, expDateCard}) => {
      dispatch(registryAction({email, password, lastName, urlImagen, nameCard, numberCard, expDateCard}));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Registry);