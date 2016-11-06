import './_home.scss';
import * as React from 'react';
import { Button, Col, Grid, Media, Row } from 'react-bootstrap';

export default class HomePage extends React.Component<any, any> {
    public render() {
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <Button href="https://discordapp.com/oauth2/authorize?client_id=230379043273310208&scope=bot" target="_blank" bsStyle="primary" bsSize="large" block>
                            Invite Pat Bot to Your Discord Server!
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button href="https://github.com/ChadLefort/pat-bot" target="_blank" bsStyle="success" bsSize="large" block>
                            View Project on Github
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h3>About</h3>
                        <hr />
                        <Media>
                            <Media.Left>
                                <img src="https://s3.amazonaws.com/pat-bot/home_about.jpg" alt="Real Life Pat" className="img-pat" />
                            </Media.Left>
                            <Media.Body>
                                <p>Pat Bot is a silly Discord bot named after my cat.</p>
                            </Media.Body>
                        </Media>
                        <h3>How to Use</h3>
                        <hr />
                        <p>Pat Bot is currently hosted and should always be available. You can invite Pat Bot to a Discord server if you have the Manage Server permission. Currently Pat Bot does not require any special permissions to run.</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
