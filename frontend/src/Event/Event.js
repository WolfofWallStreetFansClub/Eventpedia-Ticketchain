import React from 'react';
import './Event.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ethers from 'ethers';
import Modal from '../Modal';
import ContractUtils from '../Utils/ContractUtils';

const backend_url = 'http://localhost:3000';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractUtils: new ContractUtils(),
      isJoined: false,
      show: false
    };
    this.joinEvent = this.joinEvent.bind(this);
    this.payEvent = this.payEvent.bind(this);
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

  getContractUtils() {
    this.state.contractUtils.init().then((res) => {
      this.setState({
        activeWallet: res.wallet.activeWallet,
        contractUtils: res,
      })
      res.retrieveUserInfo().then(val => {
        console.log(val);
        this.setState({
            balance: ethers.utils.formatEther(val[1]),
            username: val[0]
        });
      });
      res.isEnrolled(this.props.match.params.hash).then(res => {
        if(res[0]) {
          this.setState({
            isJoined: true
          })
        }
      })
    });
  }

  componentDidMount() {
    this.getEventDetail(this.props.match.params.hash);
    this.getContractUtils();
  }

  joinEvent() {
    this.state.contractUtils.joinEvent(this.props.match.params.hash).then(res => {
      this.setState({
        showModal: true,
        success: true,
        hash: res.hash,
        show: true
      });
    }).catch(err => {
      this.setState({
        showModal: true,
        success: false,
        error: err,
        show: true
      });
    })
  }

  payEvent() {
    this.state.contractUtils.payEvent(this.props.match.params.hash).then(res => {
      this.setState({
        showModal: true,
        success: true,
        hash: res.hash,
        show: true
      });
    }).catch(err => {
      this.setState({
        showModal: true,
        success: false,
        error: err,
        show: true
      });
    })
  }

  render() {
    let eventDetail;
    if(this.state.event) {
      eventDetail = (
        <div>
        <div className="title">
          <h2>{this.state.event.name}</h2>
          <Link to="/discover"><button className="btn btn-primary btn-signup">Back</button></Link>
          {!this.state.isJoined ? (<button className="btn btn-primary btn-signup" onClick={this.joinEvent}>Sign up</button>) 
                                : (<button className="btn btn-primary btn-signup" onClick={this.payEvent}>Pay Event</button>)}
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-4">Event Location: </div>
          <div className="col-sm-8">{this.state.event.location}</div>
        </div>
        <div className="row">
          <div className="col-sm-4">Event Price:</div>
          <div className="col-sm-8">{ethers.utils.etherSymbol }{this.state.event.fee}</div>
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
        {this.state.show ? <Modal hash={this.state.hash} error={this.state.error} success={this.state.success}/> : null}
      </div>
    );
  }
}

export default Event;