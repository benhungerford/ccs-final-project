import './App.css';
import Cookies from 'js-cookie';
import React, { Component } from "react";
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: Cookies.get('Authorization')? true:false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogin(event, obj) {
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
    localStorage.setItem('is_staff', data.is_staff);
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
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/" type="button" className="btn btn-danger ml-2" onClick={this.handleLogout}>Logout</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/login">
              <Login handleLogin={this.handleLogin} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;



function Home() {
  return <h2>Home</h2>;
}
