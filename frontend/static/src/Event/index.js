import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {withRouter} from 'react-router-dom';


function FormItem(props) {
  return(
    <React.Fragment>
    <li>
      <h4>{Object.keys(props.item)}: {Object.values(props.item)}</h4>
    </li>
    <hr/>
    </React.Fragment>
  )
}


class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first: '',
      last: '',
      email: '',
      image: null,
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      datetime: '',
      items: [],
      details: '',

      item: '',
      quantity: null,
      show: false,
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/profiles/detail/`)
      .then(response => response.json())
      .then(data => this.setState({ ...data }))
      .catch(error => console.log('Error:', error));
    const eventID = this.props.match.params.eventID;
    fetch(`/api/v1/events/${eventID}/`)
        .then(response => response.json())
        .then(data => this.setState({ ...data }))
        .catch(error => console.log('Error:', error));
  }

  async submitForm(event) {
    event.preventDefault();
    const form = {...this.state};
    delete form.image;
    delete form.item;
    delete form.quantity;
    delete form.show;
    delete form.phone;

    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };
    const handleError = (err) => console.warn(err);
    await fetch('/api/v1/events/', options).catch(handleError);
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

  handleClick() {
    this.submitForm();
  }

  render() {
    const items = this.state.items.map(item => <FormItem key={this.state.items.indexOf(item)} item={item}/>)

    return(
      <React.Fragment>
        <div className="col-11 col-sm-6 mt-2">
          <h2>Create Event</h2>
          <p className="ml-3">Here's where you can fill out what you need your friends to bring bring to the table! Simply choose a time and date then add categories of what you need.</p>
            <form id="form" onSubmit={this.submitForm}>
              <h3>Date</h3>
              <input required className="form-control" type="datetime-local" placeholder="Select date" name="datetime" value={this.state.datetime} onChange={this.handleInput}/>
              <hr/>
              <h3>Items Needed</h3>
                <input className="form-control mb-1" type="text" name="item" placeholder="Sides, Desserts, Napkins, etc." maxLength="25" value={this.state.item} onChange={this.handleInput} />
                <input className="form-control mb-1" type="number" id="quantity" name="quantity" placeholder="#" value={this.state.quantity} onChange={this.handleInput} />
                <div className="row justify-content-center">
                  <button className="col-sm-3 col-m-4 col-11 button" onClick={this.updateItems}><i className="fas fa-plus-circle"></i> Add</button>
                </div>
                <hr/>
                <React.Fragment>
                  <div>
                    {items}
                  </div>
                </React.Fragment>

                <div className="row justify-content-center">
                  <button type="submit" className="col-sm-4 col-11 button">Submit</button>
                </div>
            </form>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(Event);
