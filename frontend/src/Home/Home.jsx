import React from 'react';
import { Input, Row, Col } from 'antd';
import styles from './Home.scss';
import background from '../assets/img/background.gif';
import SearchApi from './SearchApi';
import axios from 'axios';

const Search = Input.Search;

class Home extends React.Component {

  constructor(props) {
    super(props);
    
  }

  search = (value) => {
    // SearchApi.search(value).then((response) =>
    //
    // }).catch((error) => {
    //     console.error(error);
    // })
  }

  componentDidMount() {
  }

  contentToRender = () => {
    if(this.props.children) {
      return this.props.children;
    }
    return <img src={background} style={{margin: "30px auto"}} alt="background" />;
  }

  render() {
    return (
        <div className={styles.home} style={{height:"170vh", background:"black"}}>
          <Row type="flex" justify="center" style={{textAlign:"center", margin:"0px"}}>
            <Col justify="center">
            <Search
              placeholder="search for anything you want"
              onSearch={(value) => {this.search(value)}}
              className={styles.search}
              style={{textAlign:"center", margin:"50px auto"}}
               />
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <div className={styles.background} style={{textAlign:"center", margin:"40px"}}>
                {this.contentToRender()}
              </div>
            </Col>
          </Row>
        </div>
        )
  }
}

export default Home;
