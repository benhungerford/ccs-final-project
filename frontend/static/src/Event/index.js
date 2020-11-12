import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {Modal, Button} from 'react-bootstrap';


function FormItem(props) {
  return(
    <li>
      {Object.keys(props.item)}: {Object.values(props.item)}
    </li>
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

      date: '',
      time: '',
      items: [],
      details: '',

      item: '',
      quantity: 0,
      show: false,
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/profiles/detail/`)
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
    // const data = await response.json().catch(handleError);
    // console.log('data', data);
    // this.props.history.push('/profile');
    this.setState({ show: false });
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
    console.log(this.state)
    const items = this.state.items.map(item => <FormItem key={this.state.items.indexOf(item)} item={item}/>)

    return(
      <React.Fragment>
      <button className="btn btn-primary" onClick={() => this.setState({ show: true })}>Create Event</button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitForm}>
              <h3>Details</h3>
              <p>Choose a time and day:</p>
                <label htmlFor="time">Time:</label>
                <input type="time" id="time" name="time" value={this.state.time} onChange={this.handleInput} />
                <label htmlFor="date">Day: </label>
                <input type="date" id="date" name="date" required pattern="\d{2}-\d{2}-\d{4}" value={this.state.date} onChange={this.handleInput} />
              <h3>Items Needed</h3>
                <React.Fragment>
                  <ul>
                    {items}
                  </ul>
                </React.Fragment>
                <div>
                  <input className="form-control" type="text" name="item" placeholder="Sides, Desserts, Napkins, etc." value={this.state.item} onChange={this.handleInput} />
                  <input type="number" id="quantity" name="quantity" placeholder="#" value={this.state.quantity} onChange={this.handleInput} />
                </div>
                <button className="btn btn-primary" onClick={this.updateItems}>Add Item</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Button className="btn btn-primary" onClick={(event) => this.setState({show: false})}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Event;
