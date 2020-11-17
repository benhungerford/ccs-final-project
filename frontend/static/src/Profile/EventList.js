import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function EventList(props) {
  const url = `https://ccs-final-project-table.herokuapp.com/guestform/${props.event.id}`
  return(
    <React.Fragment>
      <div id="event" className="row justify-content-center mt-3">
        <div className="col-11 mb-2">
          <h4 className="">{moment.utc(props.event.datetime).format("dddd, MMMM Do")} at {moment.utc(props.event.datetime).format("h:mm a")}</h4>
        </div>
        <button onClick={() => {navigator.clipboard.writeText(url)}} className="col-11 col-sm-4 button">Copy Link</button>
        <Link key={props.event.id} className="col-11 col-sm-4 button" to={`/guestform/${props.event.id}`}>View</Link>
        <Link key={props.event.id} className="col-11 col-sm-4 button" to={`/editevent/${props.event.id}`}>Edit</Link>
      </div>
      <hr/>
    </React.Fragment>
  )
}

export default EventList;
