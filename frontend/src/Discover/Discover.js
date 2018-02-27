import React from 'react';
import ContractUtils from '../Utils'; 
import axios from 'axios';
import ethers from 'ethers';
import {Link} from 'react-router-dom';

const backend_url = 'http://localhost:3000';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeWallet: '',
      contractUtils: new ContractUtils()
    };
  }

  getContractUtils() {
    this.state.contractUtils.init().then((res) => {
      this.setState({
        activeWallet: res.wallet.activeWallet,
        contractUtils: res,
      });
    });
  }

  getEventList() {
    axios.get(backend_url+'/event/api/activeEvent').then(res => {
      this.setState({
        events: res.data
      });
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getContractUtils();
    this.getEventList();
  }

  render() {
    let eventContent;
    if(this.state.events) {
      console.log(this.state.events);
      eventContent = this.state.events.map(evt => {
        return (
          <tr>
            <td>{evt.name}</td>
            <td>{evt.location}</td>
            <td>{ethers.utils.etherSymbol+" "+evt.fee}</td>
            <td>{evt.date}</td>
            <td><Link to={"/event/"+evt.hash}><button className="btn btn-primary btn-sm">View</button></Link></td>
          </tr>
        )
      })
    }
    return (
      <div className="page-container">
        <div className="content">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Event Name</th>
                <th scope="col">Event Location</th>
                <th scope="col">Event Price</th>
                <th scope="col">Event Date</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {eventContent}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Discover;