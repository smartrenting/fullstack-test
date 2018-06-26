import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Properties from './Properties';

const About = () => (
  <div>
    About
  </div>
);

const App = () => (
  <Router key="content">
    <div>
      <Header key="header" />
      <Route exact path="/" component={Properties} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

export default App;
