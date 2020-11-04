import React, { Component } from 'react';


class Form extends Component {
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

      contacts: [],
      date: '',
      time: '',
      items: [],
      details: '',

      item: '',
      quantity: 0,

    }

    this.handleInput = this.handleInput.bind(this);
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/profiles/detail/`)
      .then(response => response.json())
      .then(data => this.setState({ ...data }))
      .catch(error => console.log('Error:', error));
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  // updateItems(event) {
  //   event.preventDefault();
  //   const items = [...this.state.items]
  //
  //   for(let i = 0; i < this.state.quantity; i++) {
  //     items.push(this.state.item);
  //   }
  //   this.setState({items, item: '', quantity: 0});
  // }

  updateItems(event) {
    event.preventDefault();
    const item = {
      [this.state.item]: Number(this.state.quantity),
    }
    const items = [...this.state.items, item];
    this.setState({items, item: '', quantity: 0});
  }

  render() {
    return(
      <React.Fragment>
        <form action="">
          <h3>Details</h3>
          <p>Choose a time and day:</p>
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" value={this.state.time} onChange={this.handleInput} />
            <label htmlFor="date">Day: </label>
            <input type="date" id="date" name="date" value={this.state.date} onChange={this.handleInput} />
            <div className="form-group">
              <label htmlFor="details">Now, write a short message asking your guests to sign up for what they want to bring:</label>
              <textarea className="form-control" id="details" rows="3" name="details" value={this.state.details} onChange={this.handleInput}></textarea>
            </div>

          <h3>Items Needed</h3>
            <React.Fragment>
              <ul>
                <li>{this.state.items}</li>
              </ul>
            </React.Fragment>
            <div>
              <input className="form-control" type="text" name="item" placeholder="Sides, Desserts, Napkins, etc." value={this.state.item} onChange={this.handleInput} />
              <input type="number" id="quantity" name="quantity" placeholder="#" value={this.state.quantity} onChange={this.handleInput} />
            </div>
            <button onClick={this.updateItems}>Add Item</button>



          <h3>Contact Info</h3>
          <p>Let your guests know where the party is and how to contact you.</p>

          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" className="form-control" id="firstname" name="first" value={this.state.first} onChange={this.handleInput} />
            <label htmlFor="lastname">Last Name</label>
            <input type="text" className="form-control" id="lastname" name="last" value={this.state.last} onChange={this.handleInput} />
          </div>
          <div className="form-group">
            <label htmlFor="InputEmail1">Email address</label>
            <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleInput} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" className="form-control" id="phone" name="phone" value={this.state.phone} onChange={this.handleInput} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" name="address" value={this.state.address} onChange={this.handleInput} />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" className="form-control" id="city" name="city" value={this.state.city} onChange={this.handleInput} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control" name="state" value={this.state.state} onChange={this.handleInput}>
              <option value="DEF">Select One...</option>
              <option value="DC">District of Columbia</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zipcode</label>
            <input type="text" className="form-control" id="zipcode" name="zipcode" value={this.state.zipcode} onChange={this.handleInput} />
          </div>

        </form>

      </React.Fragment>
    )
  }
}

export default Form;
