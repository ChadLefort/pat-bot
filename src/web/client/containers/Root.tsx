import CommandsStore from '../stores/CommandsStore';
import routes from './../routes';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { Router, browserHistory } from 'react-router';

useStrict(true);

const store = new CommandsStore();

export default class Root extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <Provider store={store}>
                <Router history={browserHistory} routes={routes} />
            </Provider>
        );
    }
}
