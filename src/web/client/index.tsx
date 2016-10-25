import App from './containers/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

declare const module: { hot: any };

const rootEl = document.getElementById('content');

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./containers/app', () => {
        const NextApp = require('./containers/app').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        );
    });
}
