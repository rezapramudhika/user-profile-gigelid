import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Registration from './components/registration';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Redirect from='/' to='/login' />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
