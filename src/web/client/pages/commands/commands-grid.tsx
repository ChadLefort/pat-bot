import * as Interface from '../../../../bot/interfaces/commands';
import CommandsCategory from './commands-category';
import * as React from 'react';

interface ICommandsGridProps {
    isLoading: boolean;
    commands: Array<Interface.ICommands>;
}

const CommandsGrid = (props: ICommandsGridProps): JSX.Element => {
    if (props.isLoading) {
        return (
            <p className="text-center">Loading...</p>
        );
    } else {
        const commands = props.commands.map((command: any, key: number) =>
            <CommandsCategory header={command.category} details={command.commandDetails} key={key} />
        );

        return (
            <div>
                {commands}
            </div>
        );
    }
};

export default CommandsGrid;
