import React from "react";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";

import CardAuthor from "../../components/CardElements/CardAuthor.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import damirBosnjak from "../../assets/img/logo.svg";
import mike from "../../assets/img/mike.jpg";
import NotificationAlert from "react-notification-alert";


class Home extends React.Component {
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
  render() {
    return (
      <div className="content">
        <NotificationAlert ref="notificationAlert" />
        <Row>
          <Col md={12} xs={12}>
            <Card className="card-user">
              <div className="image logo-home-header">"
                <img className="logo-home" src={damirBosnjak} alt="..." />
              </div>
              <CardBody>
                <p className="description text-justify">
  Our product is called Look & Pay
At Walmart we believe that the shopping experience should be simple, fast and safe for everyone.
Including people with different abilities or mobility problems.
we want you not to have to worry about using cash or credit cards, but when paying you should only smile."
                </p>
              </CardBody>
              <CardFooter>
                
              </CardFooter>
            </Card>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;