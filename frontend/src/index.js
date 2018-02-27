import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer, hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import App from './App';

const rootElement = document.getElementById('root');
const appRender = (AppToRender) => {
    render(<AppContainer>
            <BrowserRouter>
                <AppToRender />
            </BrowserRouter>
           </AppContainer>, rootElement);
};
appRender(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        appRender(NextApp);
    });
}

