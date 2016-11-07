import * as Interface from '../../../../interfaces/commands';
import * as React from 'react';
import { Table } from 'react-bootstrap';

interface ICommandsRowProps {
    details: Array<Interface.ICommandDetail>;
}

const CommandsRow = (props: ICommandsRowProps): JSX.Element => {
    return (
        <Table responsive hover striped>
            <thead>
                <tr>
                    <th>Command</th>
                    <th>Parameter</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {props.details.map((item: any, key: number) =>
                    <tr key={key}>
                        <td className="col-md-2">{item.command}</td>
                        <td className="col-md-2">{item.parameters}</td>
                        <td className="col-md-8">{item.description}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default CommandsRow;
