import * as React from 'react';
import { Col, Grid, Jumbotron, Row } from 'react-bootstrap';

class HomePage extends React.Component<any, any> {
    public render() {
        return (
            <Jumbotron>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <h1>Hello, world!</h1>
                            <p>This is the home page.</p>
                            {this.props.commands}
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        );
    }
}

export default HomePage;
