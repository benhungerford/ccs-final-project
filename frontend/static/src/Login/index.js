import React, { Component } from 'react';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return(
      <React.Fragment>
        <div className="col-11 col-sm-6 mt-2">
          <h2>Login</h2>
          <form id="form" onSubmit={(event) => this.props.handleLogin(event, this.state)}>
            <div className="form-group">
              <label htmlFor="InputName2">Username</label>
              <input type="username" className="form-control" id="InputName2" name="username" value={this.state.username} onChange={this.handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="InputPassword">Password</label>
              <input type="password" className="form-control" id="InputPassword" name="password" value={this.state.password} onChange={this.handleInput} />
            </div>
            <button type="submit" className="col-sm-4 col-12 button">Login</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;
