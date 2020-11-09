import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Event from './../Event';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      events: [],
    }
  }

  componentDidMount() {
    fetch(`/api/v1/profiles/detail/`)
      .then(response => response.json())
      .then(data => this.setState({ profile: data }))
      .catch(error => console.log('Error:', error));


    fetch(`/api/v1/events/`)
      .then(response => response.json())
      .then(data => this.setState({ events: data }))
      .catch(error => console.log('Error:', error));
  }


  render() {
    const events = this.state.events.map(event =>
      <Link key={event.id} className="col-sm-12 nav-link" to={`/guestform/${event.id}`}>
        {event.date}
      </Link>

    );
    return(
      <React.Fragment>
        <div  className="row justify-content-center text-center mt-3">
          <div className="col-12 col-sm-6">
            <div className="">
              <div className="profile-picture">
                <img src={this.state.profile.image} alt="Profile"/>
              </div>
            </div>
            <div className="">
              <h3>Name</h3>
              <p>{this.state.profile.first} {this.state.profile.last}</p>
            </div>
            <div className="">
              <h3>Address</h3>
              <p>{this.state.profile.address}</p>
              <p>{this.state.profile.city}, {this.state.profile.state} {this.state.profile.zipcode}</p>
            </div>
            <div className="">
              <h3>Phone Number</h3>
              <p>{this.state.profile.phone}</p>
            </div>
            <Link className="col nav-link" to='/editprofile'>Edit Profile</Link>
          </div>
          <div className="col-12 col-sm-6">
            <Event />
            <div className="">
              <ul>
                {events}
              </ul>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Profile;
