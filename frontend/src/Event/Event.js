import React from 'react';
import './Event.css';
import {Link} from 'react-router-dom';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getEventDetail(eventID) {
    this.setState({
      event: {
        eventName: 'Fish Hackathon',
        eventDes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        eventDate: '2018-02-10',
        eventPrice: 1.1,
        eventLocation: 'Kichener'
      }
    })
  }

  componentDidMount() {
    this.getEventDetail(this.props.match.params.eventID);
  }

  render() {
    let eventDetail;
    if(this.state.event) {
      eventDetail = (
        <div>
        <div class="title">
          <h2>{this.state.event.eventName}</h2>
          <Link to="/discover"><button className="btn btn-primary btn-signup">Back</button></Link>
          <button className="btn btn-primary btn-signup">Sign up</button>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-2">Event Location: </div>
          <div className="col-sm-10">{this.state.event.eventLocation}</div>
        </div>
        <div className="row">
          <div className="col-sm-2">Event Price:</div>
          <div className="col-sm-10">{this.state.event.eventPrice}</div>
        </div>
        <div className="row">
          <div className="col-sm-2">Event Date:</div>
          <div className="col-sm-10">{this.state.event.eventDate}</div>
        </div>
        <div className="row">
          <div className="col-sm-2">Event Description: </div>
          <div className="col-sm-10">{this.state.event.eventDes}</div>
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