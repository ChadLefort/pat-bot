import { IAction } from '../../interfaces/actions';
import { fetchCommands } from './../../actions/commands-actions';
import * as React from 'react';
import { Col, Grid, Jumbotron, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IStateProps {
    commands: Array<any>;
}

interface IDispatchProps {
    fetchCommands(): IAction<any>;
}

function mapStateToProps(state: any) {
    return {
        commands: state.commands.commands,
    };
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({ fetchCommands }, dispatch)
}

const CommandsRow = (props: any) => {
    return (
        <ul>{props.details.map((item: any, key: number) => <li key={key}>{item.command} {item.parameters}</li>)}</ul>
    );
};


const CommandsCategory = (props: any) => {
    return (
        <div>
            <h3>{props.header}</h3>
            <CommandsRow details={props.details} />
        </div>
    );
};

class CommandsPage extends React.Component<IStateProps & IDispatchProps, any> {

    public componentWillMount() {
        this.props.fetchCommands();
    }

    public render() {
        const { commands } = this.props;
        const mappedCommands = commands.map((command: any, key: number) =>
            <CommandsCategory header={command.category} details={command.commandDetails} key={key} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CommandsPage);
