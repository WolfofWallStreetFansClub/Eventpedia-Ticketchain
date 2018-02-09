import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Main from './Main';

const App = () => {
    return (
      <div className={styles.app}>
        <Layout>
            <Layout.Header>
                <Header />
            </Layout.Header>
            <Layout.Content>
                <Main />
            </Layout.Content>
        </Layout>
      </div>);
};

export default App;
