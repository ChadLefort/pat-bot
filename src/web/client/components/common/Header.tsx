import './_header.scss';
import * as React from 'react';
import { Col, Grid, Image, Jumbotron, Nav, NavItem, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const Header = (): JSX.Element => {
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Link to="/" className="navbar-brand">Pat Bot</Link>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to="/">
                            <NavItem eventKey={1}>Home</NavItem>
                        </IndexLinkContainer>
                        <LinkContainer to="/commands">
                            <NavItem eventKey={2}>Commands</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Jumbotron>
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Image src="https://s3.amazonaws.com/pat-bot/pat-bot_banner.png" className="center-block" responsive />
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        </div>
    );
};

export default Header;
