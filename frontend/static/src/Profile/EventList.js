import React from 'react';
import { Link } from 'react-router-dom';


function EventList(props) {
  return(
    <React.Fragment>
      <div>
        

      </div>
      <Link key={props.event.id} className="col-sm-12 nav-link" to={`/guestform/${props.event.id}`}>View Event</Link>
    </React.Fragment>
  )
}

export default EventList;
