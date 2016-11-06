import CommandsStore from '../../stores/commands-store';
import { IStores } from '../../types';
import './_commands.scss';
import CommandsGrid from './commands-grid';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

interface ICommandsPageProps {
    store: CommandsStore;
}

@inject((stores: IStores): ICommandsPageProps => ({ store: stores.commandsStore }))
@observer
export default class CommandsPage extends React.Component<ICommandsPageProps, any> {

    public render(): JSX.Element {
        const { store } = this.props;
        return (<CommandsGrid isLoading={store.isLoading} commands={store.commands} />);
    }
}
