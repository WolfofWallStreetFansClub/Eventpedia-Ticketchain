import React from 'react';
import styles from './Header.scss';
import Wallet from '../Wallet';

class Header extends React.Component {
    constructor() {
        super()
        this.wallet = new Wallet();
    }
    render() {
        return (
            <div className={styles.header} >
                <h1>EventPedia</h1>
            </div>
            );
    }
}

export default Header;
