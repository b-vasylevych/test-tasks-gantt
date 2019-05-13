import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as reducer from '../reducers/tasks';
import Filter from '../components/filter/Filter';

import './Home.scss';

class Home extends Component {
  componentDidMount() {
    this.props.loadTasks();
  }

  render() {
    return (
      <div className="home">
        <Filter />
      </div>
    );
  }
}

Home.propTypes = {
  currentVacancy: PropTypes.object,
  loadTasks: PropTypes.func.isRequired
};

export default connect(
  ({ tasks: { currentVacancy } }) => ({ currentVacancy }),
  dispatch => ({
    loadTasks: () => {dispatch(reducer.onTasksFetch())}
  })
)(Home);
