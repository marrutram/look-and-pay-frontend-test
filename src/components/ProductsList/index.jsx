/*eslint-disable*/
import React from "react";
import { Table } from "reactstrap";
import FormInputs from "../FormInputs/FormInputs.jsx";
import { thead } from "../../variables/general";
import PropTypes from "prop-types";
import moment from 'moment';
import numeral from 'numeral'

class ProductList extends React.Component {
  render() {
    const { products, supermarket, electronicBill, date, hour } = this.props;
    if (!products) return null;
    return (
      <form>
        <FormInputs
          ncols={["col-md-6 col-xs-12", "col-md-6 col-xs-12"]}
          proprieties={[
            {
              label: "Supermarket",
              inputProps: {
                type: "text",
                disabled: true,
                defaultValue: supermarket
              }
            },
            {
              label: "Electronic bill",
              inputProps: {
                type: "text",
                disabled: true,
                defaultValue: electronicBill
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
                defaultValue: moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY')
              }
            },
            {
              label: "Hour",
              inputProps: {
                type: "text",
                disabled: true,
                defaultValue: moment(hour, 'HH:m').format('HH:m')
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
            {products.map((prop, key) => {
              return (
                <tr key={key}>
                  <td>
                    <img src={prop.imagenUrl} alt="" className="img-circle img-no-padding img-responsive img-product" />
                  </td>
                  <td className="text-left">
                    {prop.description}
                  </td>
                  <td className="text-left">
                    {prop.count}
                  </td>
                  <td className="text-left">
                    {`${numeral(prop.unit).format('0,0')} $`}
                  </td>
                  <td className="text-left">
                    {`${numeral(prop.balance).format('0,0')} $`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </form>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  supermarket: PropTypes.string.isRequired,
  electronicBill: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired
};

export default ProductList;
