import { AppContainer, hot } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
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

