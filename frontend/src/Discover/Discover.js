import React from 'react';
import ContractUtils from '../Utils'; 
import {Link} from 'react-router-dom';

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
      })
    });
  }

  componentDidMount() {
    this.getContractUtils();
    this.setState({
      events: [
        {
          eventID: "1",
          eventName: "Fish Hackathon",
          eventLocation: "Kitchener",
          eventPrice: "15",
          eventDate: "2018-02-11"
        },
        {
          eventID: "1",
          eventName: "Barbecue",
          eventLocation: "Kitchener",
          eventPrice: "15",
          eventDate: "2018-02-11"
        },
        {
          eventID: "1",
          eventName: "GG",
          eventLocation: "Kitchener",
          eventPrice: "15",
          eventDate: "2018-02-11"
        }
      ]
    })
  }

  render() {
    let eventContent;
    if(this.state.events) {
      eventContent = this.state.events.map(evt => {
        return (
          <tr>
            <td>{evt.eventName}</td>
            <td>{evt.eventLocation}</td>
            <td>{evt.eventPrice}</td>
            <td>{evt.eventDate}</td>
            <td><Link to={"/event/"+evt.eventID}><button className="btn btn-primary btn-sm">View</button></Link></td>
          </tr>
        )
      })
    }
    return (
      <div className="page-container">
        <div className="content">
          <table class="table table-striped">
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