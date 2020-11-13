import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';
import moment from 'moment';

function Guest(props) {
  return(
    <li id="items-header" className="mb-2">
      <p>{props.guest.name}</p>: <p>{props.guest.item}</p>
    </li>
  )
}

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      item: '',
    }

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return(
      <form onSubmit={(event) => {
        this.props.addGuest(event, {name: this.state.name, item: this.state.item, category: this.props.category});
      }} id="guest-input" className="row justify-content-center">
        <React.Fragment>
          <div className="col-8">
            <input id="name" className="form-control mb-2" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInput} />
            <input id="item" className="form-control mb-2" type="text" name="item" placeholder="Item" value={this.state.item} onChange={this.handleInput} />
          </div>
          <div className="row justify-content-end col-8 mr-3 mb-1">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </React.Fragment>
      </form>
    )
  }
}

class GuestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: '',
      date: '',
      time: '',
      items: [],
      guests: [],

    }

    this.addGuest = this.addGuest.bind(this);
    this.alertHost = this.alertHost.bind(this);
  }

  componentDidMount() {
    const eventID = this.props.match.params.eventID;
    fetch(`/api/v1/events/${eventID}/`)
      .then(response => response.json())
      .then(data => this.setState({ ...data, guests: data.guests || [], }))
      .catch(error => console.log('Error:', error));
  }

  async addGuest(event, obj) {
    event.preventDefault();

    const guests = [...this.state.guests];
    guests.push(obj);
    this.setState({guests});

    const items = [...this.state.items];
    items.forEach(item => {
      if(item[obj.category]) {
        item[obj.category] -= 1;
      }
    });

    const eventID = this.props.match.params.eventID;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify({guests, items}),
    };
    const handleError = (err) => console.warn(err);
    await fetch(`/api/v1/events/${eventID}/`, options).catch(handleError);
    this.alertHost(obj);
  }

  async alertHost(obj) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(obj),
    };
    const handleError = (err) => console.warn(err);
    await fetch(`/api/v1/submit/`, options).catch(handleError);
  }

  render() {
  const html = this.state.items?.map((item, index) => {
    let keyHTML, inputHTML;
    for(const key in item) {
      // item key is number of input that should be created for that key value, e.g. 4 sides
      keyHTML = `${key}: ${item[key]}`;
      if (item[key] === 0) {
        keyHTML = '';
      }
      const array = Array.from({length: item[key]});
      inputHTML = array.map((item, index) => {
        return(
          <Input key={index} addGuest={this.addGuest} category={key}/>
        )
      });
    }
    return (
      <div key={index}>
        <h4 className="items-header">{keyHTML}</h4>
        {inputHTML}
      </div>
    )
  });

  const guests = this.state.guests?.map(guest => <Guest key={guest.index} guest={guest} />);

    return(
      <React.Fragment>
      <div className="row justify-content-center text-center">
        <div className="col-10 col-sm-7">
          <h3>&#128075; Hey there!</h3>
          <p className="">{this.state.first} has invited you to bring something to the table on {moment(this.state.datetime).format("dddd, MMMM Do")} at {moment(this.state.datetime).format("h:mm a")}!
            If you're in, fill out your name and the item your bringing down below.
          </p>
        </div>
        <div className="col-12 col-sm-7">
          <ul className="guest-form">
            {html}
          </ul>
          <ul className="guest-form">
            {guests}
          </ul>
        </div>
      </div>
      </React.Fragment>
    )
  }

}

export default withRouter(GuestForm);
