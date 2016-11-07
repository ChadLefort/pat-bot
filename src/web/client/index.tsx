import App from './pages/app';
import { useStrict } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

declare const module: { hot: any };
const rootEl = document.getElementById('content');

useStrict(true);

if (process.env.NODE_ENV === 'development') {
    const { AppContainer } = require('react-hot-loader');

    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        rootEl
    );

    if (module.hot) {
        module.hot.accept('./pages/app', () => {
            const NextApp = require('./pages/app').default;
            ReactDOM.render(
                <AppContainer>
                    <NextApp />
                </AppContainer>,
                rootEl
            );
        });
    }
} else {
    ReactDOM.render(
        <App />,
        rootEl
    );
}
