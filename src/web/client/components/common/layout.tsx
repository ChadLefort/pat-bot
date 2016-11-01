import Header from './header';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

interface ILayoutProps {
    children: Object;
}

export default class Layout extends React.Component<ILayoutProps, any> {
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
