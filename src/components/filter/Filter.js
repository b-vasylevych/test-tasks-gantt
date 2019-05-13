import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FilterControls from './filter-controls/FilterControls';
import FilterResults from './filter-results/FilterResults';


import './Filter.scss';

class Filter extends Component {
  render() {
    const { data, links, loading, error } = this.props;

    if (error) {
      return <div>{ error }</div>;
    }

    return (
      <div className="filter">
        <div>
          <FilterControls  />
        </div>

        <div>
          {!loading && !data.length && <div>No tasks match applied filters</div>}
          {/*{!loading && !!data.length && <FilterResults tasks={{ data, links }} />}*/}
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string
};

Filter.defaultProps = {
  loading: false,
  error: null
};

export default connect(
  ({ tasks : { data, links, loading, error } }) => ({ data, links, loading, error })
)(Filter);
