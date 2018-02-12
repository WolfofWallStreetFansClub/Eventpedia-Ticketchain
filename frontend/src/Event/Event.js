import React from 'react';
import './Event.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const backend_url = 'http://localhost:3000';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getEventDetail(eventID) {
    axios.get(backend_url+'/event/api/event/'+eventID).then(res => {
      this.setState({
        event: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getEventDetail(this.props.match.params.hash);
  }

  render() {
    let eventDetail;
    if(this.state.event) {
      eventDetail = (
        <div>
        <div class="title">
          <h2>{this.state.event.name}</h2>
          <Link to="/discover"><button className="btn btn-primary btn-signup">Back</button></Link>
          <button className="btn btn-primary btn-signup">Sign up</button>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-4">Event Location: </div>
          <div className="col-sm-8">{this.state.event.location}</div>
        </div>
        <div className="row">
          <div className="col-sm-4">Event Price:</div>
          <div className="col-sm-8">{this.state.event.fee}</div>
        </div>
        <div className="row">
          <div className="col-sm-4">Event Date:</div>
          <div className="col-sm-8">{this.state.event.date}</div>
        </div>
        <div className="row">
          <div className="col-sm-4">Event Description: </div>
          <div className="col-sm-8">{this.state.event.description}</div>
        </div>
        </div>
      )
    }
    return (
      <div className="page-container">
        <div className="content">
          {eventDetail}
        </div>
      </div>
    );
  }
}

export default Event;