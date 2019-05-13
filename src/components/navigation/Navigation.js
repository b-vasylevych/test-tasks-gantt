import React, { Component } from 'react';
import { Navbar, Nav, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 80,
      loadingInterval: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    const { loadingInterval } = this.state;
    if (loading && !loadingInterval) {
      this.runLoadingInterval()
    } else if (!loading && loadingInterval) {
      this.clearLoadingInterval();
    }
  }

  runLoadingInterval = () => {
    const loadingInterval = setInterval(() => {
      const { progress } = this.state;

      const randomValue = Math.random() * 30;
      const newState = {
        progress: progress >= 100 ? randomValue : progress + randomValue
      };

      this.setState(newState);
    }, 200);
    this.setState({ loadingInterval });
  };

  clearLoadingInterval = () => {
    clearInterval(this.state.loadingInterval);
    this.setState({ loadingInterval: null });
  };

  render() {
    const { loading } = this.props;
    const { progress } = this.state;

    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">orocon.me</Navbar.Brand>
        </Navbar>
        {loading && <ProgressBar className="global-progress" animated now={progress} />}
      </React.Fragment>
    );
  }
}

export default connect(({ tasks: { loading } }) => ({ loading }), {})(Navigation);
