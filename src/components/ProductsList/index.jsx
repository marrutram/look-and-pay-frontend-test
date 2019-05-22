/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
import PropTypes from "prop-types";

class ProductList extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <Row>
        <Col>
          {products.map((prod, key) => {
            
          })}
        </Col>
      </Row>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
