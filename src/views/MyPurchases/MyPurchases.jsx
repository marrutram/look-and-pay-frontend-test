import React from "react";
import { Card, Table, CardBody, Row, Col, CardFooter, Button } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import { connect } from 'react-redux';
import ProductsList from "../../components/ProductsList";
import moment from 'moment';
import numeral from 'numeral';
import { getPurchasesAction } from '../../actions/myPurchasesAction';
import { get } from 'lodash'

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

  static getDerivedStateFromProps(props, state) {
    const payments = get(props.myPurchasesState, 'purchases.payments', []);
    if (payments && payments.length > 0) {
      return Object.assign({}, state, {purchases: payments});
    }
    return state
  }
  
  componentDidMount() {
    this.props.onLoad();
  }

  onSelectPurchase = (purchase) => {
    this.setState({view: 'purchaseDetails', purchase});
  }

  onGoBack = () => {
    this.setState({view: 'purchaseList', purchase: null});
  }

  render() {
    const { purchases, view, purchase } = this.state;
    return (
      <div className="content">
        <NotificationAlert ref="notificationAlert" />
        <Row>
          <Col md={12} xs={12}>
            <Card className="card-user mt-3">
              <CardBody>
                {
                  view === 'purchaseList' ?
                  <form>
                  {
                      (purchases && purchases.length > 0) ?
                        <Table responsive>
                          <thead className="text-primary">
                            <tr>
                              <th>Date</th>
                              <th>Hour</th>
                              <th>Market</th>
                              <th>Bill</th>
                              <th>Total</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchases.map((val, key) => {
                              return (
                                <tr key={key} style={{cursor: 'pointer'}} onClick={() => this.onSelectPurchase(val)}>
                                  <td>{moment(val.date, 'YYYY-MM-DD').format('MM-DD-YYYY')}</td>
                                  <td>{moment(val.hour, 'HH:m').format('HH:m')}</td>
                                  <td className="text-capitalize">{val.supermarket}</td>
                                  <td>{val.electronicBill}</td>
                                  <td>{`${numeral(val.balance).format('0,0')} $`}</td>
                                  <td className="text-center"><Button className="btn btn-success" onClick={() => this.onSelectPurchase(val)}>View more</Button></td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                      :
                        <div className="d-flex align-items-center justify-content-center" style={{minHeight: '240px'}}>
                          <h4 className="mt-0">You don't have any purchases...</h4>
                        </div>
                    }
                  </form>
                  :
                  <ProductsList {...purchase} />
                }
              </CardBody>
              {
                view === 'purchaseDetails' &&
                <CardFooter className="text-center">
                  <Button className="btn btn-info" onClick={this.onGoBack}>Go back!</Button>
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

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(getPurchasesAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPurchases);
