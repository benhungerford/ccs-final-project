import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';

function Guest(props) {
  return(
    <div className="mb-2">
      <h4>{props.guest.guest}</h4>: <h4>{props.guest.item}</h4>
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
      <form onSubmit={(event) => {
        this.props.addGuest(event, {guest: this.state.name, item: this.state.item, category: this.props.category});
        }} className="">
        <React.Fragment>
          <input id="name" className="form-control ml-2 mb-2" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInput} />
          <input id="item" className="form-control ml-2 mb-2" type="text" name="item" placeholder="Item" value={this.state.item} onChange={this.handleInput} />
          <button type="submit" className="justify-content-end mb-2 btn btn-primary">Submit</button>
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
  }

  componentDidMount() {
    const eventID = this.props.match.params.eventID;
    fetch(`/api/v1/events/${eventID}/`)
      .then(response => response.json())
      .then(data => this.setState({ guests: data.guests || [], ...data }))
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
  }

  render() {
  const html = this.state.items.map((item, index) => {
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
        {keyHTML}
        {inputHTML}
      </div>
    )
  });

  const guests = this.state.guests.map(guest => <Guest key={guest.index} guest={guest} />);

    return(
      <React.Fragment>
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <h3><p>&#128075;</p>Hey there!</h3>
          <p>{this.state.first} has invited you to bring something to the table at {this.state.time} on {this.state.date}!<br/>
            If you're in, fill out your name and the item your bringing down below.
          </p>
        </div>
        <div className="col-11 col-sm-6">
            {html}
            {guests}
        </div>
      </div>
      </React.Fragment>
    )
  }

}

export default withRouter(GuestForm);











// const items = [{"Sides": 3}, {"Desserts": 3}];
// const guests = [{"guest": "ben", "item": "chips", "category": "Sides"}, {"guest": "taylor", "item": "salad", "category": "Sides" }];
//
//
// const categories = guests.map(guest => guest.category);
// console.log('categories', categories);
// categories.forEach(category => {
//   // e.g. category is equal to "Sides"
//   items.forEach(item => {
//     for(const key in item) {
//       if(key === category){
//         console.log('should be removing');
//         item[key] -= 1;
//       }
//     }
//   })
// });
