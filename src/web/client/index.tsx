import App from './pages/App';
import { useStrict } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

useStrict(true);

declare const module: { hot: any };

const rootEl = document.getElementById('content');

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./pages/App', () => {
        const NextApp = require('./pages/App').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        );
    });
}
