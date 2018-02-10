import React from 'react';
import styles from './Header.scss';
import Wallet from '../Wallet';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wallet: new Wallet()
        }
    }

    handleClick(e) {
        console.log(this.state.wallet.activeContract);
        this.state.wallet.activeContract.showBalance(this.state.wallet.activeWallet.address).then((val)=> console.log(val));
    }

    render() {
        return (
            <div className={styles.header}>
                <h1>Eventpedia</h1>
                <button onClick={this.handleClick.bind(this)}>Test button</button>
            </div>
            );
    }
}

export default Header;
