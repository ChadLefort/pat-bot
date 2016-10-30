import './_header.scss';
import * as React from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
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
    );
};

export default Header;
