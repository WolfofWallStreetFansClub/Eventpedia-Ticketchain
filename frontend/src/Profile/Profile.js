import React from 'react';
import {avatar} from '../Utils';
import './Profile.css';
import axios from 'axios';
import ethers from 'ethers';
import ContractUtils from '../Utils/ContractUtils';
import Modal from '../Modal';
import uuidv1 from 'uuid/v1';

const backend_url = 'localhost:3000';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeWallet: '',
      contractUtils: new ContractUtils(),
      balance: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.topUp = this.topUp.bind(this);
    this.changeName = this.changeName.bind(this);
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
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log({value, name});
    this.setState({
      [name]: value
    });
  }
  

  componentDidMount() {
    this.getContractUtils();
  }

  createEvent(e) {
    e.preventDefault();
    let eventID = uuidv1();
    let eventName = this.state.eventName;
    let eventDescription = this.state.eventDescription;
    let eventLocation = this.state.eventLocation;
    let eventDate = this.state.eventDate;
    let eventFee = this.state.eventFee;
    let eventStartDate = this.state.eventStartDate;
    let eventEndDate = this.state.eventEndDate;
    let event = {
      eventName, eventDescription, eventLocation, eventDate, eventFee, eventStartDate, eventEndDate
    }
    axios.post(`${backend_url}/event/api/activeEvent`, {
      name: eventName,
      location: eventLocation,
      description: eventDescription,
      fee: eventFee,
      date: eventDate,
      regStart: eventStartDate,
      regEnd: eventEndDate,
      hash: eventID
    }).then(res => {
      console.log(res);
    }).catch(err=>{
      console.log(err);
    });
    this.state.contractUtils.createEvent(eventFee, eventID).then(res => {
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

  topUp(e) {
    e.preventDefault();
    this.state.contractUtils.topup(this.state.amount).then((res) => {
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
    });
  }

  changeName(e) {
    e.preventDefault();
    this.state.contractUtils.changeName(this.state.newname).then((res)=>{
      this.setState({
        showModal: true,
        success: true,
        hash: res.hash,
        show: true
      })
    }).catch(err => {
      this.setState({
        showModal: true,
        success: false,
        error: err,
        show: true
      });
    });
  }

  render() {
    return(
      <div className="page-container">
        <div className="content">
          <div className="info">
            <h1>{this.state.username}</h1>
            <div className="account-info">
                <div className="">
                  Address: {this.state.activeWallet.address}
                  </div>
                <div className="">
                  Balance: {ethers.utils.etherSymbol} {this.state.balance}
                </div>
            </div>
          </div>
        <hr/>
        
        <div className="row">
          <div className="col-sm-10">
            <form onSubmit={this.createEvent}>
              <h2>Create Event</h2>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Name: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-lg" name="eventName" id="colFormLabelLg" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Description: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-lg" name="eventDescription" id="colFormLabelLg" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Location: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-lg" name="eventLocation" id="colFormLabelLg" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Paticipation Fee: </label>
                <div className="col-sm-8">
                  <input type="number" className="form-control form-control-lg" name="eventFee" id="colFormLabelLg" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Date: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg" name="eventDate" id="colFormLabelLg" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Registration Start: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg"  name="eventStartDate" id="colFormLabelLg" onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Registration Ends: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg" name="eventEndDate" id="colFormLabelLg" onChange={this.handleInputChange} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mb-2">Create</button>
            </form>
            <hr />
            <form onSubmit={this.topUp}>
              <h2>Settings</h2>
              <div className="form-group row" onSubmit={this.topUp}>
                <label className="col-sm-2 col-form-label col-form-label-lg">Top up: </label>
                <div className="col-sm-4">
                  <input type="number" className="form-control form-control-lg" id="colFormLabelLg" name="amount" onChange={this.handleInputChange} required/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Send</button>
              </div>
            </form>
            <form onSubmit={this.changeName}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-lg">Change Name: </label>
                <div className="col-sm-4">
                  <input type="text" className="form-control form-control-lg" id="colFormLabelLg" name="newname" onChange={this.handleInputChange} required/>
                </div>
                <button type="submit" className="btn btn-primary mb-2">Change</button>
              </div>
            </form>
          </div>
        </div>
        {this.state.show ? <Modal hash={this.state.hash} error={this.state.error} success={this.state.success}/> : null}
      </div>
    </div>
    );
  }
}

export default Profile;