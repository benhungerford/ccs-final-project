import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {withRouter} from 'react-router-dom';
import moment from 'moment';


function Guest(props) {
  return(
    <div id="items-header" className="row mb-2 ml-2">
      <button className="delete-button" type="button" onClick={() => props.deleteGuest(props.guest)}><i className="fas fa-minus-circle"></i></button>
      <p className="edit">{props.guest.name}: {props.guest.item}</p>
    </div>
  )
}

function FormItem(props) {
  return(
    <div className="row ml-2">
      <button className="delete-button" type="button" onClick={() => props.deleteItem(props.item)}><i className="fas fa-minus-circle"></i></button>
      <p className="edit">{Object.keys(props.item)}: {Object.values(props.item)}</p>
    </div>
  )
}


class EditEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datetime: '',
      items: [],
      guests: [],
      item: '',
      quantity: 0,
      id: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteGuest = this.deleteGuest.bind(this);
  }

  componentDidMount() {
  const eventID = this.props.match.params.eventID;
  fetch(`/api/v1/events/${eventID}/`)
      .then(response => response.json())
      .then(data => this.setState({ ...data }))
      .catch(error => console.log('Error:', error));
  }

  async deleteItem(obj) {
    const items = [...this.state.items];
    const index = items.indexOf(obj);
    items.splice(index, 1);
    this.setState({ items });

    const eventID = this.props.match.params.eventID;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify({ items }),
    };
    const handleError = (err) => console.warn(err);
    await fetch(`/api/v1/events/${eventID}/`, options).catch(handleError);
  }

  async deleteGuest(obj) {
    const guests = [...this.state.guests];
    const index = guests.indexOf(obj);
    guests.splice(index, 1);
    this.setState({ guests });

    const eventID = this.props.match.params.eventID;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify({guests}),
    };
    const handleError = (err) => console.warn(err);
    await fetch(`/api/v1/events/${eventID}/`, options).catch(handleError);
  }

  async updateEvent(event) {
    const eventID = this.props.match.params.eventID;
    event.preventDefault();
    const form = {...this.state};
    delete form.image;
    delete form.item;
    delete form.quantity;

    const options = {
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };
    const handleError = (err) => console.warn(err);
    await fetch(`/api/v1/events/${eventID}/`, options).catch(handleError);
    this.props.history.push('/profile');
  }


  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  updateItems(event) {
    event.preventDefault();
    const item = {
      [this.state.item]: Number(this.state.quantity),
    }
    const items = [...this.state.items, item];
    this.setState({items, item: '', quantity: 0});
  }

  handleClose() {
    this.setState({ show: false })
  }

  render() {
    const items = this.state.items?.map(item => <FormItem key={this.state.items.indexOf(item)} item={item} deleteItem={this.deleteItem}/>)
    const guests = this.state.guests?.map(guest => <Guest key={guest.index} guest={guest} deleteGuest={this.deleteGuest} />);
    return(
      <React.Fragment>
          <div className="col-11 col-sm-6 mt-2">
            <h2>Edit Your Event</h2>
            <form id="form" onSubmit={this.updateEvent}>
              <h3>Date</h3>
              <h4>{moment.utc(this.state.datetime).format("dddd, MMMM Do, h:mm a")}</h4>
              <label htmlFor="datetime">Edit Date and Time:</label>
              <input className="form-control" type="datetime-local" id="datetime" placeholder="Select date" name="datetime" value={this.state.datetime} onChange={this.handleInput}/>
              <hr/>
              <h3>Items Needed</h3>
                <div>
                  <input className="form-control mb-1" type="text" name="item" placeholder="Sides, Desserts, Napkins, etc." maxLength="25" value={this.state.item} onChange={this.handleInput} />
                  <input className="form-control mb-1" type="number" id="quantity" name="quantity" placeholder="#" value={this.state.quantity} onChange={this.handleInput} />
                </div>
                <div className="row justify-content-center">
                  <button className="col-sm-3 col-m-4 col-11 button" onClick={this.updateItems}><i className="fas fa-plus-circle"></i> Add</button>
                </div>
                <React.Fragment>
                  <div>
                    {items}
                  </div>
                </React.Fragment>
                <hr/>
                  <div>
                    <h3>Guests</h3>
                    {guests}
                  </div>
                <hr/>
                <div className="row justify-content-center">
                  <button type="submit" onClick={(event) => this.props.deleteEvent(event, this.props.match.params.eventID)} className="col-sm-4 col-12 button"><i className="fas fa-minus-circle delete"></i> Delete Event</button>
                  <button type="submit" className="col-sm-4 col-12 button"><i class="fas fa-save"></i> Save</button>
                </div>
            </form>
          </div>
      </React.Fragment>
    )
  }
}

export default withRouter(EditEvent);
