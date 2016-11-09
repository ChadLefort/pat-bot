import './_home.scss';
import * as React from 'react';
import { Button, Col, Grid, Media, Row } from 'react-bootstrap';
import { Link } from 'react-router';

export default class HomePage extends React.Component<any, any> {
    public render() {
        return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <Button href="https://discordapp.com/oauth2/authorize?client_id=230379043273310208&scope=bot" target="_blank" bsStyle="primary" bsSize="large" block>
                            Invite to Your Discord Server
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
                            <div className="media-left hidden-xs">
                                <img src="https://s3.amazonaws.com/pat-bot/home_about.jpg" alt="Real Life Pat" className="img-pat" />
                            </div>
                            <div className="visible-xs text-center">
                                <img src="https://s3.amazonaws.com/pat-bot/home_about.jpg" alt="Real Life Pat" className="img-pat" />
                            </div>
                            <Media.Body>
                                <p>Pat Bot is a silly <a href="https://discordapp.com" target="_blank">Discord</a> bot named after my cat that I rescued
                                back in 2013. It was created one evening when I was bored and wanted to start a new project. I had just recently
                                found <a href="https://discordapp.com" target="_blank">Discord</a> and created a server for my World of Warcraft guild and
                                after browsing through a few bots I thought why use these when I can create my own. So I did.</p>

                                <p>Pat Bot is currently a very simple bot with just a few <Link to={'commands'}>commands</Link> that involves a couple pictures
                                of Pat herself, some WoW related memes and gifs, and other random things such as Giphy and YouTube search. I do have plans to
                                expand Pat Bot into something a bit more complex, but this is just a hobby project that I’m using as platform to learn and expand my
                                experience as a programmer.</p>

                                <p>Some feature ideas include reminders, WoW armory, Twitch streamer notifications, and custom commands through a web interface.</p>
                            </Media.Body>
                        </Media>
                        <h3>How to Use</h3>
                        <hr />
                        <p>Pat Bot is currently hosted and should always be available. You can invite Pat Bot to a Discord server if you
                        have the <strong>Manage Server</strong> permission. Currently Pat Bot does not require any special permissions to run.</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
