import React from "react";
import { Card, Table, CardHeader, CardBody, CardTitle, CardFooter, Row, Col } from "reactstrap";

import CardAuthor from "../../components/CardElements/CardAuthor.jsx";
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";

import supermarketPhoto from "../../assets/img/super.jpeg";

import mike from "../../assets/img/mike.jpg";
import NotificationAlert from "react-notification-alert";

import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { thead, tbody } from "../../variables/general";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }
  onTakePhoto (dataUri) {
    console.log('takePhoto', dataUri);
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
  notify(options) {
    this.refs.notificationAlert.notificationAlert(options);
  }

  messageWelcome() {
    const options = {
      place: "tr",
      message: (
        <div>
          <div>
            Welcome to the <b>automated payment</b> simulation.
          </div>
        </div>
      ),
      type: "info",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  }

  componentDidMount() {
    this.messageWelcome();
  }
  
  render() {
    const { loginState } = this.props;

    if (!loginState.isAuthenticated) {
      return <Redirect from="/" to="/login"/>;
    }

    return (
      <div className="content">
        <NotificationAlert ref="notificationAlert" />
        <Row>
          <Col md={4} xs={12}>
            <Card className="card-user">
              <div className="image">
                <img src={supermarketPhoto} alt="..." />
              </div>
              <CardBody>
                
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
                <hr />
                <div className="button-container">
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className="mr-auto ml-auto">
                      <h5>
                        Smile in photo
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md={8} xs={12}>
            <Card className="card-user">
              <CardBody>
                <form>
                  <FormInputs
                    ncols={["col-md-6 col-xs-12", "col-md-6 col-xs-12"]}
                    proprieties={[
                      {
                        label: "Supermarket",
                        inputProps: {
                          type: "text",
                          disabled: true,
                          defaultValue: "lider Vitacura."
                        }
                      },
                      {
                        label: "Electronic bill",
                        inputProps: {
                          type: "text",
                          disabled: true,
                          defaultValue: "000015354123143."
                        }
                      }
                    ]}
                  />
                  
                   <FormInputs
                    ncols={["col-md-6 col-xs-12", "col-md-6 col-xs-12"]}
                    proprieties={[
                      {
                        label: "Date",
                        inputProps: {
                          type: "text",
                          disabled: true,
                          defaultValue: "12/02/2019"
                        }
                      },
                      {
                        label: "Hour",
                        inputProps: {
                          type: "text",
                          disabled: true,
                          defaultValue: "12:30"
                        }
                      }
                    ]}
                  />
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        {thead.map((prop, key) => {
                          if (key === thead.length - 1)
                            return (
                              <th key={key} className="text-right">
                                {prop}
                              </th>
                            );
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tbody.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.data.map((prop, key) => {
                              if (key === 0)
                                return (
                                  <td key={key}>
                                    <img src={prop} alt="" className="img-circle img-no-padding img-responsive img-product" />
                                  </td>
                                );
                              if (key === thead.length - 1)
                                return (
                                  <td key={key} className="text-right">
                                    {prop}
                                  </td>
                                );
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button color="primary" round>Pay</Button>
                    </div>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

export default connect(mapStateToProps)(User);