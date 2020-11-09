import './App.css';
import Cookies from 'js-cookie';
import React, { Component } from "react";
import Home from './../Home';
import Nav from './../Nav';
import Register from './../Register';
import Login from './../Login';
import Profile from './../Profile';
import EditProfile from './../Profile/EditProfile';
import Event from './../Event';
import GuestForm from './../Event/GuestForm';

import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: !!Cookies.get('Authorization'),
    }
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  async handleRegistration(event, obj) {
    event.preventDefault();
    const user = {username: obj.username, email: obj.email, password1: obj.password1, password2: obj.password2}
    const profile = {first: obj.first, last: obj.last, email: obj.email, image: obj.image, address: obj.address, city: obj.city, state: obj.state, zipcode: obj.zipcode, phone: obj.phone}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user),
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/rest-auth/registration/', options);
    const data = await response.json().catch(handleError);
    if(data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      // localStorage.setItem('is_staff', data.is_staff)
      this.createProfile(profile);
    }
  }

  async createProfile(obj) {
    // event.preventDefault();

    const formData = new FormData();
    const keys = Object.keys(obj);
    keys.forEach(key => formData.append(key, obj[key]));

    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/profiles/', options);
    const data = await response.json().catch(handleError);
    console.log('data', data);
    // if(data.key) {
      // Cookies.set('Authorization', `Token ${data.key}`);
    this.setState({ isLoggedIn: true });
    this.props.history.push('/profile');
    // }
  }

  async editProfile(event, obj) {
    event.preventDefault();
    if(typeof obj.image === "string") {
      delete obj.image
    };
    const formData = new FormData();
    const keys = Object.keys(obj);
    keys.forEach(key => formData.append(key, obj[key]));
    const options = {
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/api/v1/profiles/detail/', options);
    const data = await response.json().catch(handleError);
    console.log('data', data);
    this.props.history.push('/profile');
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
      this.props.history.push('/profile');
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
    }
  }


  render() {
    return (
      <React.Fragment>
          <Nav handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
          <Switch>
            <Route path='/guestform/:eventID'>
              <GuestForm />
            </Route>
            <Route path='/event'>
              <Event />
            </Route>
            <Route path='/editprofile'>
              <EditProfile editProfile={this.editProfile}/>
            </Route>
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
