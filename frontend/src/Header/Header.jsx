import React from 'react';
import styles from './Header.scss';
import ContractUtils from '../Utils';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contractUtils: new ContractUtils()
        }
    }

    handleClick(e) {
        this.state.contractUtils.retrieveUserInfo().then((name, credit, balance) => {
            console.log(name+" "+balance+" "+credit);
        })
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
