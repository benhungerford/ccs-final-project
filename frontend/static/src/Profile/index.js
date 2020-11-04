import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
      <React.Fragment>
        <div>
          <div>
            <img src={this.state.profile.image} alt="Profile"/>
          </div>
          <div>
            <h3>Name</h3>
            <p>{this.state.profile.first} {this.state.profile.last}</p>
          </div>
          <div>
            <h3>Address</h3>
            <p>{this.state.profile.address}</p><br/>
            <p>{this.state.profile.city}, {this.state.profile.state} {this.state.profile.zipcode}</p><br/>
          </div>
          <div>
            <h3>Phone Number</h3>
            <p>{this.state.profile.phone}</p>
          </div>
          <Link to='/editprofile'>Edit Profile</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
