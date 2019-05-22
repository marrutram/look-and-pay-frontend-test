import React from "react";
import { Card, CardHeader, CardBody, CardTitle, CardFooter, Row, Col } from "reactstrap";
import CardAuthor from "../../components/CardElements/CardAuthor.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import damirBosnjak from "../../assets/img/damir-bosnjak.jpg";
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
          <Col md={4} xs={12}>
            <Card className="card-user">
              <div className="image">
                <img src={damirBosnjak} alt="..." />
              </div>
              <CardBody>
                <CardAuthor
                  avatar={mike}
                  avatarAlt="..."
                  title="WELCOME"
                  description="@chetfaker"
                />
                <p className="description text-justify">
  Our product is called Look & Pay
At Walmart we believe that the shopping experience should be simple, fast and safe for everyone.
Including people with different abilities or mobility problems.
we want you not to have to worry about using cash or credit cards, but when paying you should only smile."
                </p>
                <Button
                  color="primary"
                  block
                  onClick={() => this.notify("tc")}
                >
                  Bottom Center
                </Button>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col xs={6} sm={6} md={6} lg={3} className="ml-auto">
                      <h5>
                        12
                        <br/>
                        <small>Files</small>
                      </h5>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={4} className="mr-auto ml-auto">
                      <h5>
                        2GB
                        <br/>
                        <small>Used</small>
                      </h5>
                    </Col>
                    <Col lg={3} className="mr-auto">
                      <h5>
                        24,6$
                        <br/>
                        <small>Spent</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;