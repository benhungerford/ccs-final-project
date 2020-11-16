import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EventList from './EventList';


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
    const events = this.state.events.map(event => <EventList key={event.index} event={event} />

    );
    return(
      <React.Fragment>
          <div className="row col-11 col-sm-7 justify-content-center text-center mt-2 mb-3 profile">
            <div className="col-12">
              <div className="profile-picture">
                <img src={this.state.profile.image} alt="Profile"/>
              </div>
            </div>
            <div className="">
              <div className="profile-text">
                <h6>Name</h6>
                <p>{this.state.profile.first} {this.state.profile.last}</p>
              </div>
              <div className="profile-text">
                <h6>Address</h6>
                <p>{this.state.profile.address}</p>
                <p>{this.state.profile.city}, {this.state.profile.state} {this.state.profile.zipcode}</p>
              </div>
              <div className="profile-text">
                <h6>Phone Number</h6>
                <p>{this.state.profile.phone}</p>
              </div>
              <Link className="edit-profile" to='/editprofile'><i className="fas fa-pen"></i> Edit Profile</Link>
            </div>
          </div>

          <div className="row col-11 col-sm-7 justify-content-center text-center profile">
            <div className="row col-12 justify-content-center text-center">
              <h3 className="col-12 events">Your Events</h3>
              <Link to="/event" className="col-sm-4 col-12 button">New Event <i className="fas fa-plus"></i></Link>
            </div>
            <div className="mt-1">
              {events}
            </div>
          </div>

      </React.Fragment>
    );
  }
}

export default Profile;
