import './App.css';
import Cookies from 'js-cookie';
import React, { Component } from "react";
import Home from './../Home';
import Nav from './../Nav';
import Register from './../Register';
import Login from './../Login';
import Profile from './../Profile';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleRegistration(event, obj) {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/rest-auth/registration/', options);
    const data = await response.json().catch(handleError);
    if(data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      localStorage.setItem('is_staff', data.is_staff)
      this.props.history.push('/');
    }

    
  }

  async handleLogin(event, obj) {
    console.log('firing');
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/rest-auth/login/', options).catch(handleError);
    const data = await response.json().catch(handleError);
    console.log(data);
    if(data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({isLoggedIn: true});
      this.props.history.push('/');
    }
}

  async handleLogout(){
    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/rest-auth/logout/', options);
    const data = await response.json().catch(handleError);
    // console.log(data);
    if(data.detail === "Successfully logged out."){
      Cookies.remove('Authorization');
      this.setState({isLoggedIn: false});
      localStorage.removeItem('is_staff', data.is_staff)
    }
  }

  render() {
    return (
      <React.Fragment>
          <Nav handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
          <Switch>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path="/register">
              <Register handleRegistration={this.handleRegistration} />
            </Route>
            <Route path="/login">
              <Login handleLogin={this.handleLogin} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </React.Fragment>
    );
  }
}


export default withRouter(App);
