import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      first: '',
      last: '',
      image: null,
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleImage(e){
    let file = e.target.files[0];
    this.setState({
      image: file,
    });
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
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" className="form-control" id="firstname" name="first" value={this.state.first} onChange={this.handleInput} />
          <label htmlFor="lastname">Last Name</label>
          <input type="text" className="form-control" id="lastname" name="last" value={this.state.last} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="img">Upload Profile Picture</label>
          <input type="file" id="img" name="image" accept="image/*" onChange={this.handleImage}/>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={this.state.address} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleInput} />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">State</label>
          <select id="inputState" className="form-control" name="state" onChange={this.handleInput}>
            <option value="DEF">Select One...</option>
            <option value="DC">District of Columbia</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">Zipcode</label>
          <input type="text" className="form-control" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleInput} />
        </div>
        <button type="submit" className="button">Register</button>
      </form>
    )
  }
}

export default Register;
