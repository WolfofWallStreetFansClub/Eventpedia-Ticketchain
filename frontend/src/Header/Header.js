import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top mainNav" role="navigation" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand js-scroll-trigger" to='/'>Eventpedia</Link>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fa fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className='nav-link' to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/discover'>Discover</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/profile'>Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
