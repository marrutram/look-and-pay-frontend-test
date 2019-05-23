import React, {Fragment} from "react";
import { Card, Table, CardBody, CardFooter, Row, Col } from "reactstrap";
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import supermarketPhoto from "../../assets/img/logo.svg";
import NotificationAlert from "react-notification-alert";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { connect } from 'react-redux';
import { thead, tbody, supermarketArray, productArray} from "../../variables/general";
import * as moment from 'moment-timezone';
import { random, map, get } from 'lodash';
import { createPayAction , clearPayAction} from '../../actions/createPayAction';
import Loader from "../../components/Loader";

class SupermarketTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidUpdate(e) {
    this.messagePayError();
  } 

  async onTakePhoto (dataUri) {
    
    await this.setState({
      userImage: dataUri
    });
    this.props.onPay(this.state);
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
    if(get(this.refs, 'notificationAlert')){
      this.refs.notificationAlert.notificationAlert(options);
    }
  }

  componentDidMount() {
    this.messageWelcome();
    this.randomData();
  }
  
  async randomData() {
    const supermarketIndex = random(1, supermarketArray.length - 1);
    const supermarket = supermarketArray[supermarketIndex];
    const electronicBill = random(999, 10000) + 99999999;
    const date =  moment().tz("America/Santiago").format("MM-DD-YYYY"); 
    const hour =  moment().tz("America/Santiago").format("HH:mm");
    const products = []; 
    let index = random(0, 4);
    let balance = 0;
    for (let i = 0; i < 3; i++) {
      const product = productArray[index];
      product.count = random(1, 100);
      product.balance = String(product.count * product.unit);
      products.push(product);
      index++;
      tbody.push({
        className: "table-success",
        data: map(product)
      });
      balance =+ product.balance;
    }
    await this.setState({
      supermarket: supermarket,
      electronicBill: String(electronicBill),
      date: date,
      hour: hour,
      balance: String(balance),
      products: products
    });
  }

  messagePayError() {
    if(!this.props.createPayState.loading && this.props.createPayState.error != null) {
      const options = {
        place: "tc",
        message: (
          <div>
            <div>
               <b>Error in registry</b> <br/> {this.props.createPayState.error}
            </div>
          </div>
        ),
        type: "danger",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      };
      if(get(this.refs, 'notificationAlert')){
        this.refs.notificationAlert.notificationAlert(options);
        this.props.clearPay();
      }
    } 
    if(!this.props.createPayState.loading && this.props.createPayState.pay != null) {
      const options = {
        place: "tc",
        message: (
          <div>
            <div>
               <b>success</b> <br/> Pay
            </div>
          </div>
        ),
        type: "success",
        icon: "nc-icon nc-bell-55",
        autoDismiss: 3
      };
      if(get(this.refs, 'notificationAlert')){
        this.refs.notificationAlert.notificationAlert(options);
        this.props.clearPay();
      }
    }
  }

  render() {
    return (
      <div className="content">
      {
        this.props.createPayState.loading ?
          <Loader/>
        :
        <Fragment>
          <NotificationAlert ref="notificationAlert" />
          <Row>
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
                            defaultValue: this.state.supermarket
                          }
                        },
                        {
                          label: "Electronic bill",
                          inputProps: {
                            type: "text",
                            disabled: true,
                            defaultValue: this.state.electronicBill
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
                            defaultValue: this.state.date
                          }
                        },
                        {
                          label: "Hour",
                          inputProps: {
                            type: "text",
                            disabled: true,
                            defaultValue: this.state.hour
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
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} xs={12}>
              <Card className="card-user card-pay">
                <div className="image">
                  <img className="logo-look-pay " src={supermarketPhoto} alt="..." />
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
          </Row>
        </Fragment>
      } 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = dispatch => {
  return {
    onPay: ({supermarket, electronicBill, date, hour, balance, products, userImage}) => {
      dispatch(createPayAction({supermarket, electronicBill, date, hour, balance, products, userImage}));
    },
    clearPay: () => {
      dispatch(clearPayAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SupermarketTest);