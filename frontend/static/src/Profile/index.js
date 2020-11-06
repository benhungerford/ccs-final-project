import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './../Form';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    }
  }

  componentDidMount() {
    fetch(`/api/v1/profiles/detail/`)
      .then(response => response.json())
      .then(data => this.setState({ profile: data }))
      .catch(error => console.log('Error:', error));
  }

  render() {
    return(
        <div  className="row justify-content-center text-center mt-3 profile">
          <div className=" profile-picture">
            <img src={this.state.profile.image} alt="Profile"/>
          </div>
          <div className="col-sm-12">
            <h3>Name</h3>
            <p>{this.state.profile.first} {this.state.profile.last}</p>
          </div>
          <div className="col-sm-12">
            <h3>Address</h3>
            <p>{this.state.profile.address}</p>
            <p>{this.state.profile.city}, {this.state.profile.state} {this.state.profile.zipcode}</p>
          </div>
          <div className="col-sm-12">
            <h3>Phone Number</h3>
            <p>{this.state.profile.phone}</p>
          </div>
          <Link className="col-sm-12 nav-link" to='/editprofile'>Edit Profile</Link>
          <Form />
        </div>
    );
  }
}

export default Profile;
