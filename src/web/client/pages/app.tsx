import createRoutes from '../setup/create-routes';
import createStores from '../setup/create-stores';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { Router, browserHistory } from 'react-router';

const stores = createStores();
const routes = createRoutes();

export default class App extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <Provider {...stores}>
                <Router history={browserHistory} routes={routes} />
            </Provider>
        );
    }
}
