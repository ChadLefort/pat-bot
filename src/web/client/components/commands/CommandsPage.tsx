import CommandsStore from '../../stores/CommandsStore';
import CommandsGrid from './CommandsGrid';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

interface ICommandsPageProps {
    store: CommandsStore;
}

@inject('store')
@observer
export default class CommandsPage extends React.Component<ICommandsPageProps, any> {

    public render(): JSX.Element {
        const { store } = this.props;
        return (<CommandsGrid isLoading={store.isLoading} commands={store.commands} />);
    }
}
