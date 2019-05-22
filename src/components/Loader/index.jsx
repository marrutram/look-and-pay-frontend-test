/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import {Spinner} from 'reactstrap';

class Loader extends React.Component {
  render() {
    const {minHeight} = this.props;
    return (
      <div style={{minHeight: minHeight}} className="d-flex flex-column justify-content-center align-items-center">
        <div>
          <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" type="grow"/>
        </div>
        <div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }
}

Loader.propTypes = {
  minHeight: PropTypes.string
};

Loader.defaultProps = {
  minHeight: '240px'
}

export default Loader;
