import Header from './header';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

interface ILayoutProps {
    children: Object;
}

export default class Layout extends React.Component<ILayoutProps, any> {
    private devTools(): JSX.Element {
        if (process.env.NODE_ENV === 'development') {
            const DevTools = require('mobx-react-devtools').default;
            return (<DevTools />);
        }
    }

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
                {this.devTools()}
            </div>
        );
    }
}
