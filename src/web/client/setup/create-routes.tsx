import Layout from '../components/common/layout';
import CommandsPage from '../pages/commands/commands-page';
import HomePage from '../pages/home/home-page';
import { PageName, pageNames } from '../types';
import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes(): JSX.Element {
    const routes = pageNames.map((name: PageName): JSX.Element => {
        return <Route key={name} path={'/' + name} component={getPage(name)} />;
    });

    return (
        <Route path="/" component={Layout} >
            <IndexRoute component={HomePage} />
            {routes}
        </Route>
    );
}

export function getPage(name: PageName): React.ComponentClass<any> {
    switch (name) {
        case 'commands': return CommandsPage;
        default: throw new Error(`Unknown experiment name "${name}"`);
    }
}
