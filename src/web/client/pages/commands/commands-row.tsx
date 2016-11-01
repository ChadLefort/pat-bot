import * as Interface from '../../../../interfaces/commands';
import * as React from 'react';

interface ICommandsRowProps {
    details: Array<Interface.ICommandDetail>;
}

const CommandsRow = (props: ICommandsRowProps): JSX.Element => {
    return (
        <ul>{props.details.map((item: any, key: number) => <li key={key}>{item.command} {item.parameters}</li>)}</ul>
    );
};

export default CommandsRow;
