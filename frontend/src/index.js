import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './App';

const rootElement = document.getElementById('root');
const appRender = (AppToRender) => {
    render(<AppContainer>
                <Provider>
                    <BrowserRouter>
                        <AppToRender />
                    </BrowserRouter>
                </Provider>
           </AppContainer>, rootElement);
};
appRender(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        appRender(NextApp);
    });
}
