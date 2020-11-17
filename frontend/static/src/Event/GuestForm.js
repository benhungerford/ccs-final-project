import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';
import moment from 'moment';

function Guest(props) {
  return(
    <div id="items-header" className="row mb-2 ml-1">
      <p className="edit">{props.guest.name}: {props.guest.item}</p>
    </div>
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
      <React.Fragment>
        <form onSubmit={(event) => {
          this.props.addGuest(event, {name: this.state.name, item: this.state.item, category: this.props.category});
        }} id="guest-input" className="row mb-2">
          <React.Fragment>
              <input id="name" className="form-control mb-2 col-12" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInput} />
              <input id="item" className="form-control mb-2 col-9" type="text" name="item" placeholder="Item" value={this.state.item} onChange={this.handleInput} />
              <button type="submit" className="col-2 guest-button"><i class="fas fa-check-circle"></i></button>
          </React.Fragment>
        </form>
        <hr/>
      </React.Fragment>
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
    // event.preventDefault();

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
        <div className="row justify-content-start ml-1">
          <h4 className="items-header">{keyHTML}</h4>
        </div>

        {inputHTML}
      </div>
    )
  });

  const guests = this.state.guests?.map(guest => <Guest key={guest.index} guest={guest} />);

    return(
      <React.Fragment>
      <div id="form" className="row justify-content-center text-center col-11 col-sm-7">
        <div className="col-12 mb-2">
          <h3>&#128075; Hey there!</h3>
          <p className=""><b>{this.state.first}</b> has invited you to bring something to the table on <b>{moment(this.state.datetime).format("dddd, MMMM Do")} at {moment(this.state.datetime).format("h:mm a")}</b>!
            If you're in, fill out your name and the item you're bringing down below.
          </p>
        </div>
        <div className="col-12">
          <div className="">
            {html}
          </div>
          <div className="">
            <h3>Guests</h3>
            <p>See what each guest is bringing</p>
            {guests}
          </div>
          <hr/>
        </div>
      </div>
      </React.Fragment>
    )
  }

}

export default withRouter(GuestForm);
