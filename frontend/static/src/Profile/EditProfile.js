import React, { Component } from 'react';



class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: '',
      last: '',
      image: null,
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
    }
  }

  render() {
    return(
      <h1>Edit Profile Form</h1>
    );
  }
}

export default EditProfile;
