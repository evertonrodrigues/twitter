import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Timeline from './pages/Timeline';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} ></Route>
          <Route path="/timeline" component={Timeline} ></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
