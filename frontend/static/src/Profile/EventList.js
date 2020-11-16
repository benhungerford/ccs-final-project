import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function EventList(props) {
  return(
    <React.Fragment>
      <div id="event" className="row justify-content-center mt-3">
        <div className="col-11 mb-2">
          <h4 className="">{moment(props.event.datetime).format("dddd, MMMM Do")} at {moment(props.event.datetime).format("h:mm a")}</h4>
        </div>
        <button className="col-11 col-sm-3 button">Copy Link</button>
        <Link key={props.event.id} className="col-11 col-sm-3 button" to={`/guestform/${props.event.id}`}>View</Link>
        <Link key={props.event.id} className="col-11 col-sm-3 button" to={`/editevent/${props.event.id}`}>Edit</Link>
      </div>
      <hr/>
    </React.Fragment>
  )
}

export default EventList;
