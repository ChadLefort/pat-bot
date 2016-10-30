import Header from './common/Header';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

interface IAppProps {
    children: Object;
}

export default class App extends React.Component<IAppProps, any> {
    public render(): JSX.Element {
        return (
            <div>
                <Header />
                <Grid>
                    <Row>
                        <Col md={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
                <DevTools />
            </div>
        );
    }
}
