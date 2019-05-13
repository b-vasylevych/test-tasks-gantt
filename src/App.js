import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/navigation/Navigation';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-wrapper">
          <Navigation />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
