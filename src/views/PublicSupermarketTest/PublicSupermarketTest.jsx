import React, {Fragment} from "react";
import { Card, Table, CardBody, CardFooter, Row, Col, Button } from "reactstrap";
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
import numeral from 'numeral';
import successImg from "../../assets/img/success.png";
import errorImg from "../../assets/img/error.png";

class PublicSupermarketTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.notify = this.notify.bind(this);
  }

  // componentDidUpdate(e) {
  //   this.messagePayError();
  // } 

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
    this.props.clearErrorPay();
    this.messageWelcome();
    this.randomData();
  }
  
  async randomData() {
    tbody.splice(0,tbody.length)
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
      supermarket: String(supermarket),
      electronicBill: String(electronicBill),
      date: date,
      hour: hour,
      balance: String(balance),
      products: products
    });
  }

  render() {
    return (
      <div className="content">
      {
        this.props.createPayState.loading ?
          <Loader />
        :
        <Fragment>
          {/* <NotificationAlert ref="notificationAlert" /> */}
          {
            (this.props.createPayState.error === null && this.props.createPayState.pay === null) &&
            <Row>
              <Col md={12} xs={12}>
                <Card className="card-user card-pay card-public">
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
                          <div className="total">
                            TOTAL 
                          </div>
                          <div className="balance">
                             {`${numeral(this.state.balance).format('0,0')} $`}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          }
          {
            this.props.createPayState.error !== null &&
            <Fragment>
              <Row className="d-block">
                <Col md={12} xs={12} className="text-center">
                  <img src={errorImg} style={{maxHeight: '300px'}} alt="error" />
                </Col>
                <Col md={12} xs={12} className="text-center">
                  <h4><b>Error in registry</b> <br/> {this.props.createPayState.error}</h4>
                </Col>
                <Col md={12} xs={12} className="text-center">
                  <Button className="btn btn-info" onClick={() => this.props.clearErrorPay()}>Go Back</Button>
                </Col>
              </Row>
            </Fragment>
          }
          {
            this.props.createPayState.pay !== null &&
            <Fragment>
              <Row className="d-block mt-3">
                <Col md={12} xs={12} className="text-center">
                  <img src={successImg} style={{maxHeight: '300px'}} alt="error" />
                </Col>
                <Col md={12} xs={12} className="text-center">
                  <h4>
                    <b>Purchase success!</b><br/>
                    {
                      this.props.createPayState && this.props.createPayState.pay &&
                      this.props.createPayState.pay.createPayment &&
                      <span>Hi {this.props.createPayState.pay.createPayment.name} {this.props.createPayState.pay.createPayment.lastname} thanks for your purchase!</span>
                    }
                  </h4>
                </Col>
                <Col md={12} xs={12} className="text-center">
                  <Button className="btn btn-info" onClick={() => this.props.clearErrorPay()}>Go Back</Button>
                </Col>
              </Row>
            </Fragment>
          }
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
    clearErrorPay: () => {
      dispatch(clearPayAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicSupermarketTest);