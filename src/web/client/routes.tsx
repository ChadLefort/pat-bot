import App from './components/App';
import CommandsPage from './components/commands/CommandsPage';
import HomePage from './components/home/HomePage';
import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={HomePage} />
        <Route path="commands" component={CommandsPage} />
    </Route>
);
