import Root from './containers/Root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

declare const module: { hot: any };

const rootEl = document.getElementById('content');

ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NextApp = require('./containers/Root').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        );
    });
}
