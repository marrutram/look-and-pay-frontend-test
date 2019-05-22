import React from "react";
import { Card, Table, CardBody, CardFooter, Row, Col } from "reactstrap";
import FormInputs from "../../components/FormInputs/FormInputs.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import supermarketPhoto from "../../assets/img/logo.svg";
import NotificationAlert from "react-notification-alert";
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { connect } from 'react-redux';
import { thead, tbody, supermarketArray, productArray} from "../../variables/general";
import * as moment from 'moment-timezone';
import numeral from 'numeral'
import { random, map, sumBy } from 'lodash';

class MyPuchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }
  
  onDismiss() {}

  componentDidMount() {
    this.randomData();
  }
  
  async randomData() {
    const purchasesCount = random(10, false);
    let purchases = [];
    for(let i=0; i<=purchasesCount; i++) {
      const supermarketIndex = random(1, supermarketArray.length - 1);
      const supermarket = supermarketArray[supermarketIndex];
      const electronicBill = random(999, 10000) + 99999999;
      const date =  moment().tz("America/Santiago").format("MM-DD-YYYY"); 
      const hour =  moment().tz("America/Santiago").format("HH:mm");
      const products = []; 
      let index = random(0, 4);
      for (let i = 0; i < 3; i++) {
        const product = productArray[index];
        product.count = random(1, 10);
        product.total = product.count * product.unit;
        products.push(product);
        index++;
        tbody.push({
          className: "table-success",
          data: map(product)
        });
      }
      purchases.push({supermarket, electronicBill, date, hour, products});
    }
    await this.setState({
      purchases
    });
  }

  render() {
    const {purchases} = this.state;
    return (
      <div className="content">
        <NotificationAlert ref="notificationAlert" />
        <Row>
          <Col md={12} xs={12}>
            <Card className="card-user">
              <CardBody>
                <form>
                {
                    purchases && purchases.length > 0 && 
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Date</th>
                          <th>Hour</th>
                          <th>Market</th>
                          <th>Bill</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchases.map((val, key) => {
                          const total = sumBy(val.products, 'total');
                          return (
                            <tr key={key}>
                              <td>{val.date}</td>
                              <td>{val.hour}</td>
                              <td className="text-capitalize">{val.supermarket}</td>
                              <td>{val.electronicBill}</td>
                              <td>{`${numeral(total).format('0,0')} $`}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  }
                  {/* <FormInputs
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
                  /> */}
                  {/* <Table responsive>
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
                  </Table> */}
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

export default connect(mapStateToProps)(MyPuchases);