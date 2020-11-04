import './App.css';
import Cookies from 'js-cookie';
import React, { Component } from "react";
import Home from './../Home';
import Nav from './../Nav';
import Register from './../Register';
import Login from './../Login';
import Profile from './../Profile';
import EditProfile from './../Profile/EditProfile';

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
  }

  async handleRegistration(event, obj) {
    event.preventDefault();
    const user = {username: obj.username, email: obj.email, password1: obj.password1, password2: obj.password2}
    const profile = {first: obj.first, last: obj.last, image: obj.image, address: obj.address, city: obj.city, state: obj.state, zipcode: obj.zipcode, phone: obj.phone}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user),
      // body: JSON.stringify({username: obj.username, email: obj.email, password1: obj.password1, password2: obj.password2}),
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

    // async handleRegistration(e, form){
    //      e.preventDefault();
    //      const user = {username: form.username, email: form.email, password1: form.password1, password2: form.password2}
    //      const profile = {first: form.first, last: form.last, image: form.image, address: form.address, city: form.city, state: form.state, zipcode: obj.zipcode, phone: obj.phone}
    //      let formData = new FormData();
    //      const keys = Object.keys(form);
    //      keys.forEach(key => formData.append(key, form[key]));
    //      console.log(formData);
    //      const options = {
    //        method: 'POST',
    //        headers: {
    //          'X-CSRFToken': Cookies.get('csrftoken'),
    //        },
    //        body: formData
    //      };
    //      const handleError = (err) => console.warn(err);
    //      const response = await fetch('/api/v1/recipes/', options);
    //      const data = await response.json().catch(handleError);
    //      console.log(data);
    //      if(data.key){
    //        Cookies.set('Authorization', `Token ${data.key}`)
    //      }
    //    }


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
      localStorage.removeItem('is_staff', data.is_staff)
    }
  }

  render() {
    return (
      <React.Fragment>
          <Nav handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
          <Switch>
            <Route path='/editprofile'>
              <EditProfile profile={this.props.profile}/>
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
