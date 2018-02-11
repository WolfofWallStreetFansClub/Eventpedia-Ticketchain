import React from 'react';
import {avatar} from '../Utils';
import './Profile.css';
import axios from 'axios';
import ethers from 'ethers';
import ContractUtils from '../Utils/ContractUtils';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeWallet: '',
      contractUtils: new ContractUtils(),
      balance: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.topUp = this.topUp.bind(this);
  }

  getContractUtils() {
    this.state.contractUtils.init().then((res) => {
      this.setState({
        activeWallet: res.wallet.activeWallet,
        contractUtils: res,
      })
      res.showBalance(res.wallet.activeWallet.address).then(val => {
        this.setState({
            balance: ethers.utils.formatEther(val[0])
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
    e.preventDefault();
  }

  topUp(e) {
    e.preventDefault();
    console.log(this.state.amount);
    this.state.contractUtils.topup(this.state.amount).then((res) => {
      console.log(res);
    })
  }

  render() {
    return(
      <div className="page-container">
        <div className="content">
          <div className="info">
            <h1>XIAOAGE</h1>
            <div className="account-info">
                <div className="">
                  Address: {this.state.activeWallet.address}
                  </div>
                <div className="">
                  Balance: {this.state.balance}
                </div>
            </div>
          </div>
        <hr/>
        
        <div className="row">
          <div className="col-sm-10">
            <form>
              <h2>Create Event</h2>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Name: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-lg" name="eventName" id="colFormLabelLg" onChange={this.handleInputChange}/>
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
                  <input type="text" className="form-control form-control-lg" name="eventLocation" id="colFormLabelLg" onChange={this.handleInputChange}/>
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
                  <input type="datetime-local" className="form-control form-control-lg" name="eventDate" id="colFormLabelLg" onChange={this.handleInputChange}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Registration Start: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg"  name="eventStartDate" id="colFormLabelLg" onChange={this.handleInputChange}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Registration Ends: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg" name="eventEndDate" id="colFormLabelLg" onChange={this.handleInputChange}/>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mb-2" onClick={this.createEvent}>Create</button>
            </form>
            <hr />
            <form>
              <h2>Settings</h2>
              <div className="form-group row">
              <label className="col-sm-2 col-form-label col-form-label-lg">Top up: </label>
              <div className="col-sm-4">
                <input type="number" className="form-control form-control-lg" id="colFormLabelLg" name="amount" onChange={this.handleInputChange}/>
              </div>
              <button type="submit" className="btn btn-primary mb-2" onClick={this.topUp}>Send</button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;