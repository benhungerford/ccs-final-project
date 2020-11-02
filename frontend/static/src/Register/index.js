import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  render() {
    return(
      <form onSubmit={(event) => this.props.handleRegistration(event, this.state)}>
        <h4>Register</h4>
        <div className="form-group">
          <label htmlFor="InputName1">Username</label>
          <input type="username" className="form-control" id="InputName1" name="username" value={this.state.username} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="InputEmail1">Email address</label>
          <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword1">Create password</label>
          <input type="password" className="form-control" id="InputPassword1" name="password1" value={this.state.password1} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword2">Re-type password</label>
          <input type="password" className="form-control" id="InputPassword2" name="password2" value={this.state.password2} onChange={this.handleInput} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    )
  }
}

export default Register;
