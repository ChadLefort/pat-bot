import * as Interface from '../../../../bot/interfaces/commands';
import CommandsRow from './CommandsRow';
import * as React from 'react';

interface ICommandsCategoryProps {
    header: string;
    details: Array<Interface.ICommandDetail>;
}

const CommandsCategory = (props: ICommandsCategoryProps): JSX.Element => {
    return (
        <div>
            <h3>{props.header}</h3>
            <CommandsRow details={props.details} />
        </div>
    );
};

export default CommandsCategory;
