import React from 'react';
import {avatar} from '../Utils';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.contractUtils.wallet.activeContract);
  }

  render() {
    return(
      <div className="page-container">
        <div className="content">
        <h1>XIAOAGE</h1>
        <hr/>
        
        <div className="row">
          <div className="col-sm-2">
            <div className="row">
              Address: {this.props.contractUtils.wallet.activeWallet.address}
            </div>
            <div className="row">
              Balance: {}
            </div>
          </div>
          <div className="col-sm-10">
            <form>
              <h2>Create Event</h2>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Name: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-lg" id="colFormLabelLg" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Description: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-lg" id="colFormLabelLg" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Location: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control form-control-lg" id="colFormLabelLg" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Paticipation Fee: </label>
                <div className="col-sm-8">
                  <input type="number" className="form-control form-control-lg" id="colFormLabelLg" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Event Date: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg" id="colFormLabelLg" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Registration Start: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg" id="colFormLabelLg" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label col-form-label-lg">Registration Ends: </label>
                <div className="col-sm-8">
                  <input type="datetime-local" className="form-control form-control-lg" id="colFormLabelLg" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mb-2">Create</button>
            </form>
            <hr />
            <form>
              <h2>Settings</h2>
              <div className="form-group row">
              <label className="col-sm-2 col-form-label col-form-label-lg">Top up: </label>
              <div className="col-sm-4">
                <input type="text" className="form-control form-control-lg" id="colFormLabelLg" />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Send</button>
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