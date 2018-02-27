import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css'


class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="masthead">
        <div className="container">
          <div className="intro-text">
            <span className="name">A Decentralized Events Sharing Platform</span>
            <hr className="star-light" />
            <span className="skills">Proudly Powered By Ethereum Blockchain and Infura Services</span><br/>
            <span className="good">Free - Transparent - Reliable</span><br/>
            <Link to="/discover" className="btn btn-lg btn-outline ">
              <i className="fa fa-play"></i>
              Explore Events
            </Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Home;
