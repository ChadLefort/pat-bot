import routes from './../routes';
import store from './../store';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

class Root extends React.Component<any, any> {
    public render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory} routes={routes} />
            </Provider>
        );
    }
}

export default Root;
