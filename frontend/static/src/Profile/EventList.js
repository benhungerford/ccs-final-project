import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function EventList(props) {
  return(
    <React.Fragment>
      <div className="row">
        <h4 className="col-4 col-sm-12">{moment(props.event.datetime).format("M/D/YY")}</h4>
        <Link key={props.event.id} className="col-sm-12 btn btn-primary" to={`/editevent/${props.event.id}`}>Edit</Link>
        <Link key={props.event.id} className="col-sm-12 btn btn-primary" to={`/guestform/${props.event.id}`}>View</Link>
      </div>
    </React.Fragment>
  )
}

export default EventList;
