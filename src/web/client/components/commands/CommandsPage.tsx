import { fetchCommands } from './../../actions/commands-actions';
import * as React from 'react';
import { Col, Grid, Jumbotron, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

interface IStateProps {
    commands: Array<any>;
}

function mapStateToProps(state: any): any {
    return {
        commands: state.commands.commands,
    };
}

class CommandsPage extends React.Component<any, any> {

    public componentWillMount() {
        this.props.dispatch(fetchCommands());
    }

    public render() {
        const { commands } = this.props;
        const mappedCommands = commands.map((command: any) =>
            <div>
                <h3>{command.category}</h3>
                <ul>{command.commandDetails.map((item: any) => <li>{item.command} {item.parameters}</li>)}</ul>
            </div>
        );

        return (
            <div>
                <Jumbotron>
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <p>This is the commands page.</p>
                            </Col>
                        </Row>
                    </Grid>
                </Jumbotron>
                <Grid>
                    <Row>
                        <Col md={12}>
                            {mappedCommands}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CommandsPage);
