import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class GuestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],

    }
  }

  componentDidMount() {
    const eventID = this.props.match.params.eventID;
    fetch(`/api/v1/events/${eventID}/`)
      .then(response => response.json())
      .then(data => this.setState({ ...data }))
      .catch(error => console.log('Error:', error));
    // http://127.0.0.1:8000/api/v1/forms/10/
  }

  render() {
    const items = this.state.items.map(item => Object.keys(item));
    const quantity = this.state.items.map(item => Object.values(item));
    return(
      <React.Fragment>
        <div><h1>{items}:{quantity}</h1></div>
      </React.Fragment>
    )
  }

}

export default withRouter(GuestForm);
