import routes from './../routes';
import * as React from 'react';
import { Router, browserHistory } from 'react-router';

class Root extends React.Component<any, any> {
    public render() {
        return (
            <Router history={browserHistory} routes={routes} />
        );
    }
}

export default Root;
