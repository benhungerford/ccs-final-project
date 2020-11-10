import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

function Guest(props) {
  return(
    <li>
      {props.guest.name}: {props.guest.item}
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
        this.setState({addMode: false});
        this.props.addGuest(event, {guest: this.state.name, item: this.state.item, category: this.props.category});
      }

      } className="row">

          <React.Fragment>
          <label htmlFor="name">Name</label>
          <input id="name" className="form-control ml-2 col-4" type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInput} />
          <label htmlFor="item">Item You're Bringing</label>
          <input id="item" className="form-control ml-2 col-4" type="text" name="item" placeholder="Item" value={this.state.item} onChange={this.handleInput} />
          <button type="submit" className="ml-2 btn btn-primary">Submit</button>
          </React.Fragment>

      </form>
    )
  }
}

class GuestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      guests: [],
    }

    this.addGuest = this.addGuest.bind(this);
  }

  componentDidMount() {
    const eventID = this.props.match.params.eventID;
    fetch(`/api/v1/events/${eventID}/`)
      .then(response => response.json())
      .then(data => this.setState({ items: data.items, guests: data.guests || [] }))
      .catch(error => console.log('Error:', error));
  }

  async addGuest(event, obj) {

    event.preventDefault();

    const items = [...this.state.items];
    items.forEach(item => {
      if(item[obj.category]) {
        item[obj.category] -= 1;
      }
    });

    const guests = [...this.state.guests];
    guests.push(obj);
    this.setState({guests});


    const eventID = this.props.match.params.eventID;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({guests, items}),
    };
    const handleError = (err) => console.warn(err);
    await fetch(`/api/v1/events/${eventID}/`, options).catch(handleError);
  }

  render() {


  console.log('items in state', this.state.items);
  const html = this.state.items.map((item, index) => {
    let keyHTML, inputHTML;

    for(const key in item) {
      // item key is number of input that should be created for that key value, e.g. 4 sides
      keyHTML = `${key}: ${item[key]}`;
      console.log(keyHTML, item[key]);
      const array = Array.from({length: item[key]});
      inputHTML = array.map((item, index) => {
        return(
          <Input key={index} addGuest={this.addGuest} category={key}/>
        )
      });
    }
    return (
      <div key={index}>
        <div>{keyHTML}</div>
        <div>{inputHTML}</div>
      </div>
    )
  });


    return(
      <React.Fragment>
        <ul>
          {html}

        </ul>

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
