import React from 'react';
import './Modal.css'

var ETHERSCAN_URL = "https://ropsten.etherscan.io/tx/";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    window.onclick = this.refreshPage;
    return(
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="exampleModalLabel">{this.props.success ? "Success" : "Fail"}</h2>
            <span className="close" onClick={this.refreshPage}>&times;</span>
          </div>
          <div className="modal-body">
            {this.props.success ? (
                <div>
                  You transaction has been confirm. Please wait for the block to be mine.
                  <br />
                  <a target="_blank" href={ETHERSCAN_URL+this.props.hash}>Click here to view the transaction on Etherscan</a>
                </div>
              ) : (
                "You transaction failed with error " + this.props.error + ". Please make sure you have enough balance"
              )}
          </div>
          <div className="modal-footer">
            {
              this.props.success ? (
                <button type="button" className="btn btn-success" onClick={this.handleClose}>Finish</button>
              ) : (
                <button type="button" className="btn btn-danger" onClick={this.handleClose}>Finish</button>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;