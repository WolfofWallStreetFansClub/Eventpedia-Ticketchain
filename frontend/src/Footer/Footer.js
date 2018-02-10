import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <footer className="text-center">
      <div className="footer-above">
        <div className="container">
          <div className="row">
            <div className="footer-col col-md-4">

            </div>
            <div className="footer-col col-md-4">

            </div>
            <div className="footer-col col-md-4">

            </div>
          </div>
        </div>
      </div>
      <div className="footer-below">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
                &copy;
            </div>
          </div>
        </div>
      </div>
      </footer>
    );
  }
}

export default Footer;