import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


function Input() {
  return(
    <div className="row">
      <input className="form-control ml-2 col-4" type="text" placeholder="Name" />
      <input className="form-control ml-2 col-4" type="text" placeholder="Item" />
      <button type="button" className="ml-2 btn btn-primary">Submit</button>
    </div>
  )

}

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
      .then(data => this.setState({ items: data.items }))
      .catch(error => console.log('Error:', error));
  }

  render() {
  const html = this.state.items.map((item, index) => {

    let keyHTML, inputHTML;

    for(const key in item) {
      keyHTML = `${key}: ${item[key]}`;
      const array = Array.from({length: item[key]});
      inputHTML = array.map((item, index) => {
        // console.log('item', item);
        return(
          <Input key={index} />
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
          {html}
      </React.Fragment>
    )
  }

}

export default withRouter(GuestForm);
