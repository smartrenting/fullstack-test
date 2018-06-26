import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Header from './Header';
import Properties from './Properties';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8080',
});

const About = () => (
  <div>
    About
  </div>
);

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={Properties} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
