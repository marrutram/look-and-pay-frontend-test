import React from "react";
import { Card, Table, CardBody, Row, Col, CardFooter, Button } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { connect } from 'react-redux';
import { thead, tbody, supermarketArray, productArray} from "../../variables/general";
import ProductsList from "../../components/ProductsList";
import * as moment from 'moment-timezone';
import numeral from 'numeral'
import { random, map, sumBy, toString } from 'lodash';

class MyPurchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      view: 'purchaseList',
      purchase: null
    };
    this.onSelectPurchase = this.onSelectPurchase.bind(this);
    this.onGoBack = this.onGoBack.bind(this);
  }
  
  onDismiss() {}

  componentDidMount() {
    this.randomData();
  }

  onSelectPurchase = (purchase) => {
    this.setState({view: 'purchaseDetails', purchase});
  }

  onGoBack = () => {
    this.setState({view: 'purchaseList', purchase: null});
  }
  
  async randomData() {
    const purchasesCount = random(10, false);
    let purchases = [];
    for(let i=0; i<=purchasesCount; i++) {
      const supermarketIndex = random(1, supermarketArray.length - 1);
      const supermarket = supermarketArray[supermarketIndex];
      const electronicBill = toString(random(999, 10000) + 99999999);
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
    const { purchases, view, purchase } = this.state;
    return (
      <div className="content">
        <NotificationAlert ref="notificationAlert" />
        <Row>
          <Col md={12} xs={12}>
            <Card className="card-user">
              <CardBody>
                {
                  view === 'purchaseList' ?
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
                              <tr key={key} style={{cursor: 'pointer'}} onClick={() => this.onSelectPurchase(val)}>
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
                  </form>
                  :
                  <ProductsList {...purchase} />
                }
              </CardBody>
              {
                view === 'purchaseDetails' &&
                <CardFooter className="text-center">
                  <Button onClick={this.onGoBack}>Go back!</Button>
                </CardFooter>
              }
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

export default connect(mapStateToProps)(MyPurchases);